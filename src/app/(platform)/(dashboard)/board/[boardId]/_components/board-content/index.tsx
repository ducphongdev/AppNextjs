'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { mapOrder } from '@/app/_utils/sorts';
import ListColumns from './list-columns/list-columns';
import { Board, Cards, Columns, Items } from '@/app/_types/board.type';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  UniqueIdentifier,
  CollisionDetection,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  MeasuringStrategy,
  ClientRect,
  Active,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';
import Column from './list-columns/column/column';
import Card from './list-columns/column/list-cards/card/card';
import { DroppableContainer, RectMap } from '@dnd-kit/core/dist/store';
import { Coordinates } from '@dnd-kit/utilities';
import { generatePlaceholderCard } from '@/app/_utils/fomatter';

interface ListBoardProps {
  board: Board;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }: ListBoardProps) {
  const id = useId();

  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const [orderColumns, setOrderColumns] = useState<Columns[]>([]);
  const [activeDragItemId, setActiveDragItemId] = useState<UniqueIdentifier | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null);
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<Columns | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

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
    const mapOrderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id') as Columns[];
    setOrderColumns(mapOrderColumns);
  }, [board]);

  // Func xử lý cập nhật state trong trường hợp kéo Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn: Columns,
    overCarId: UniqueIdentifier,
    active: any,
    over: any,
    activeDraggingCardId: UniqueIdentifier,
    activeDraggingCardData: any,
    activeColumn: Columns
  ) => {
    setOrderColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCarId);

      let newCardIndex: number;

      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

      const nextColumn = cloneDeep(prevColumns);

      const nextActiveColumns = nextColumn?.find((column) => column._id === activeColumn._id);
      const nextOverColumns = nextColumn?.find((column) => column._id === overColumn._id);

      if (nextActiveColumns) {
        // Tìm card đang được active và xóa khỏi column
        nextActiveColumns.cards = nextActiveColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumns.cards)) {
          nextActiveColumns.cards = [generatePlaceholderCard(nextActiveColumns)];
        }
        nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map((card) => card._id);
      }

      if (nextOverColumns) {
        // Kiểm tra card đang kéo đã tồn tại ở OverColumn hay chưa, nếu có thì xóa đi
        nextOverColumns.cards = nextOverColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        // Chèn card vào OverColumn
        nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumns._id,
        } as Cards);

        nextOverColumns.cards = nextOverColumns.cards.filter((card) => !card.FE_PlaceholderCard);

        nextOverColumns.cardOrderIds = nextOverColumns.cards.map((card) => card._id);
      }

      return nextColumn;
    });
  };

  // Tìm Column theo CardId
  const findColumnByCardId = (cardId: string): Columns => {
    return orderColumns.find(
      (column) => column?.cards?.map((card) => card._id)?.includes(cardId)
    ) as Columns;
  };

  const collisionDetectionStrategy = useCallback(
    (args: {
      active: Active;
      collisionRect: ClientRect;
      droppableRects: RectMap;
      droppableContainers: DroppableContainer[];
      pointerCoordinates: Coordinates | null;
    }) => {
      // const isColumn = orderColumns?.filter((column) => column._id === activeDragItemId);

      // if (activeDragItemId && isColumn.length) {
      //   return closestCenter({
      //     ...args,
      //     droppableContainers: args.droppableContainers.filter((container) =>
      //       orderColumns.some((orderColumn) => container.id === orderColumn._id)
      //     ),
      //   });
      // }

      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // console.log('🚀 ~ file: index.tsx:183 ~ args:', args);

      // Tìm các điểm giao nhau và va chạm với con trỏ
      const pointerIntersections = pointerWithin(args);

      // console.log('🚀 ~ file: index.tsx:187 ~ pointerIntersections:', pointerIntersections);

      if (!pointerIntersections?.length) return;
      // const intersections =
      //   pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);

      let overId = getFirstCollision(pointerIntersections, 'id');

      console.log('🚀 ~ file: index.tsx:197 ~ overId:', overId);

      if (overId != null) {
        const checkColumn = orderColumns.find((column) => column._id === overId);

        if (checkColumn) {
          // console.log('🚀 ~ file: index.tsx:200 ~ checkColumn:', checkColumn);
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            ),
          })[0]?.id;

          lastOverId.current = overId;

          return [{ id: overId }];
        }
      }

      // Nếu overId null thì trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [orderColumns, activeDragItemType]
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
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
        activeColumn
      );
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!active || !over) return;
    // console.log('🚀 ~ file: index.tsx:323 ~ active:', active);
    // console.log('🚀 ~ file: index.tsx:323 ~ over:', over);

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
        moveCardBetweenDifferentColumns(
          overColumn,
          overCarId,
          active,
          over,
          activeDraggingCardId,
          activeDraggingCardData,
          activeColumn
        );
      } else {
        const oldColumnIndex = oldColumnWhenDraggingCard?.cards.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newColumnIndex = overColumn?.cards?.findIndex((c) => c._id === overCarId);

        // Sắp xếp lại Cards(use ArrayMove)
        const dndOrderCards: Cards[] = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldColumnIndex,
          newColumnIndex
        );

        setOrderColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn: Columns | undefined = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          if (targetColumn) {
            targetColumn.cards = dndOrderCards;
            targetColumn.cardOrderIds = dndOrderCards.map((card) => card._id);
          }

          return nextColumns;
        });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        const oldColumnIndex = orderColumns.findIndex((c) => c._id === active.id);

        // console.log('🚀 ~ file: index.tsx:323 ~ oldColumnIndex:', oldColumnIndex);

        // console.log('🚀 ~ file: index.tsx:323 ~ orderColumns:', orderColumns);
        const newColumnIndex = orderColumns.findIndex((c) => c._id === over.id);

        // console.log('🚀 ~ file: index.tsx:330 ~ newColumnIndex:', newColumnIndex);

        // console.log('🚀 ~ file: index.tsx:326 ~ newColumnIndex:', newColumnIndex);
        // Sắp xếp lại Columns ban đầu (use ArrayMove)
        setOrderColumns(arrayMove(orderColumns, oldColumnIndex, newColumnIndex));
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
      // collisionDetection={collisionDetectionStrategy}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className="absolute inset-0 p-4 h-full overflow-x-auto">
        <ListColumns columns={orderColumns} />
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {!activeDragItemId && null}
        {activeDragItemId && activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_COLUMN' && (
          <Column column={activeDragItemData} />
        )}
        {activeDragItemId && activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_CARD' && (
          <Card card={activeDragItemData} />
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardContent;
