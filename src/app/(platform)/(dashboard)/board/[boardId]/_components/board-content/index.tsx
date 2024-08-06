'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import ListColumns from './list-columns/list-columns';
import { IColumn, ICard, Items, IBoard } from '@/types/board.type';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
  pointerWithin,
  getFirstCollision,
  ClientRect,
  Active,
  closestCorners,
  Collision,
} from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/utilities';
import {
  moveCardToDifferentColumn,
  updateBoardDetails,
} from '@/lib/features/board/boardThunk';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import { updateBoard } from '@/lib/features/board/boardSlice';
import { updateColumnDetails } from '@/lib/features/column/columnThunk';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';
import Column from './list-columns/column/column';
import Card from './list-columns/column/list-cards/card/card';
import { DroppableContainer, RectMap } from '@dnd-kit/core/dist/store';
import { generatePlaceholderCard } from '@/utils/formatter';
import { useSensors } from '@/lib/hooks/useSensors';

interface ListBoardProps {
  board: IBoard | null;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }: ListBoardProps) {
  const id = useId();
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const [orderColumns, setOrderColumns] = useState<IColumn[]>([]);
  const [activeDragItemId, setActiveDragItemId] =
    useState<UniqueIdentifier | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  );
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState<IColumn | null>(null);
  const sensors = useSensors();

  const dispatch = useAppDispatch();

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  useEffect(() => {
    const mapOrderColumns = board?.columns as IColumn[];
    setOrderColumns(mapOrderColumns);
  }, [board]);

  // Tìm Column theo CardId
  const findColumnByCardId = (cardId: string): IColumn => {
    return orderColumns.find(
      (column) => column?.cards?.map((card) => card._id)?.includes(cardId)
    ) as IColumn;
  };

  // Func xử lý cập nhật state trong trường hợp kéo Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn: IColumn,
    overCarId: UniqueIdentifier,
    active: any,
    over: any,
    activeDraggingCardId: UniqueIdentifier,
    activeDraggingCardData: any,
    activeColumn: IColumn,
    triggerFrom: string
  ) => {
    setOrderColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCarId
      );

      let newCardIndex: number;

      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumn = cloneDeep(prevColumns);

      const nextActiveColumns = nextColumn?.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumns = nextColumn?.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumns) {
        // Tìm card đang được active và xóa khỏi column
        nextActiveColumns.cards = nextActiveColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumns.cards)) {
          nextActiveColumns.cards = [
            generatePlaceholderCard(nextActiveColumns),
          ];
        }
        nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(
          (card) => card._id
        );
      }

      if (nextOverColumns) {
        // Kiểm tra card đang kéo đã tồn tại ở OverColumn hay chưa, nếu có thì xóa đi
        nextOverColumns.cards = nextOverColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        // Chèn card vào OverColumn
        nextOverColumns.cards = nextOverColumns.cards.toSpliced(
          newCardIndex,
          0,
          {
            ...activeDraggingCardData,
            columnId: nextOverColumns._id,
          } as ICard
        );

        nextOverColumns.cards = nextOverColumns.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        nextOverColumns.cardOrderIds = nextOverColumns.cards.map(
          (card) => card._id
        );
      }

      if (triggerFrom === 'handleDragEnd') {
        const dndOrderedColumnsIds = nextColumn.map((c) => c._id);
        dispatch(
          updateBoard({
            dndOrderedColumns: nextColumn,
            dndOrderedColumnsIds,
          })
        );

        let prevCardOrderIds =
          nextColumn.find((c) => c._id === oldColumnWhenDraggingCard?._id)
            ?.cardOrderIds || [];
        let nextCardOrderIds = nextColumn.find(
          (c) => c._id === nextOverColumns?._id
        )?.cardOrderIds;
        if (prevCardOrderIds[0].includes('placeholder-card')) {
          prevCardOrderIds = [];
        }
        dispatch(
          moveCardToDifferentColumn({
            dataUpdate: {
              currentCardId: activeDraggingCardId,
              prevColumnId: oldColumnWhenDraggingCard?._id,
              prevCardOrderIds,
              nextColumnId: nextOverColumns?._id,
              nextCardOrderIds,
            },
          })
        );
      }

      return nextColumn;
    });
  };

  // Func gọi API xử lý kéo thả Column
  const moveColumn = (dndOrderedColumns: IColumn[]) => {
    // Cập nhật lại state Column
    const dndOrderedColumnsIds = dndOrderedColumns.map((c: IColumn) => c._id);
    dispatch(
      updateBoard({
        dndOrderedColumns,
        dndOrderedColumnsIds,
      })
    );

    dispatch(
      updateBoardDetails({
        boardId: board?._id,
        dataUpdate: { columnOrderIds: dndOrderedColumnsIds },
      })
    );
  };

  // Func gọi API xử lý kéo thả Card trong cùng một Column
  const moveCardInTheSameColumn = (
    dndOrderCards: any,
    dndOrderedCardIds: any,
    columnId: any
  ) => {
    dispatch(
      updateColumnDetails({
        columnId,
        dataUpdate: { cardOrderIds: dndOrderedCardIds },
      })
    );
  };

  const collisionDetectionStrategy = useCallback(
    (args: {
      active: Active;
      collisionRect: ClientRect;
      droppableRects: RectMap;
      droppableContainers: DroppableContainer[];
      pointerCoordinates: Coordinates | null;
    }): Collision[] => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args }) || [];
      }

      // Tìm các điểm giao nhau và va chạm với con trỏ
      const pointerIntersections = pointerWithin(args);

      if (!pointerIntersections?.length) {
        return [];
      }

      let overId = getFirstCollision(pointerIntersections, 'id');

      if (overId != null) {
        const checkColumn = orderColumns.find(
          (column) => column._id === overId
        );

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id as string)
            ),
          })[0]?.id;

          lastOverId.current = overId;

          return [{ id: overId }];
        }
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [orderColumns, activeDragItemType]
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current as Items);

    // Nếu kéo Card mới thực hiện hành động
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id as string));
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;

    const { id: overCarId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId as string);
    const overColumn = findColumnByCardId(overCarId as string);

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCarId,
        active,
        over,
        activeDraggingCardId,
        activeDraggingCardData,
        activeColumn,
        'handleDragOver'
      );
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;

      const { id: overCarId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId as string);
      const overColumn = findColumnByCardId(overCarId as string);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
        // Hành đồng kéo thả card trong 2 Column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCarId,
          active,
          over,
          activeDraggingCardId,
          activeDraggingCardData,
          activeColumn,
          'handleDragEnd'
        );
      } else {
        // Hành đồng kéo thả card trong cùng một Column
        const oldColumnIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newColumnIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCarId
        );

        const dndOrderCards: ICard[] = arrayMove(
          oldColumnWhenDraggingCard?.cards as ICard[],
          oldColumnIndex,
          newColumnIndex
        );
        const dndOrderedCardIds = dndOrderCards.map((card) => card._id);

        setOrderColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn: IColumn | undefined = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          if (targetColumn) {
            targetColumn.cards = dndOrderCards;
            targetColumn.cardOrderIds = dndOrderedCardIds;
          }

          return nextColumns;
        });

        moveCardInTheSameColumn(
          dndOrderCards,
          dndOrderedCardIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        const oldColumnIndex = orderColumns?.findIndex(
          (c) => c._id === active.id
        );

        const newColumnIndex = orderColumns?.findIndex(
          (c) => c._id === over.id
        );

        // Sắp xếp lại IColumn ban đầu (use ArrayMove)
        const dndOrderedColumns = arrayMove(
          orderColumns,
          oldColumnIndex,
          newColumnIndex
        );

        setOrderColumns(dndOrderedColumns);

        moveColumn(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="absolute inset-0 p-4 h-full overflow-x-auto">
        <ListColumns columns={orderColumns} />
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {!activeDragItemId && null}
        {activeDragItemId &&
          activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_COLUMN' && (
            <Column column={activeDragItemData} />
          )}
        {activeDragItemId &&
          activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_CARD' && (
            <Card card={activeDragItemData} />
          )}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardContent;
