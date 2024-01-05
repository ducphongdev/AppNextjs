'use client';
import { useCallback, useEffect, useId, useState } from 'react';
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
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep } from 'lodash';
import Column from './list-columns/column/column';
import Card from './list-columns/column/list-cards/card/card';

interface ListBoardProps {
  board: Board;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }: ListBoardProps) {
  const id = useId();
  const [orderColumns, setOrderColumns] = useState<Columns[]>([]);

  const [activeDragItemId, setActiveDragItemId] = useState<UniqueIdentifier | null>(null);

  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null);

  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);

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

  // Tìm Column theo CardId
  const findColumnByCardId = (cardId: string): Columns => {
    return orderColumns.find(
      (column) => column?.cards?.map((card) => card._id)?.includes(cardId)
    ) as Columns;
  };

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeDragItemId) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in orderColumns
          ),
        });
      }
      console.log(args);
    },
    [activeDragItemId]
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current as Items);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;

    const { id: overCarId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId as string);
    const overColumn = findColumnByCardId(overCarId as string);

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      setOrderColumns((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCarId);

        let newCardIndex: number;

        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

        const nextColumn = cloneDeep(prevColumns);

        const nextActiveColumns = nextColumn?.find((column) => column._id === activeColumn._id);
        const nextOverColumns = nextColumn?.find((column) => column._id === overColumn._id);

        if (nextActiveColumns) {
          // Tìm card đang được active và xóa khỏi column
          nextActiveColumns.cards = nextActiveColumns.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );
          nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map((card) => card._id);
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
            activeDraggingCardData as Cards
          );
          nextOverColumns.cardOrderIds = nextOverColumns.cards.map((card) => card._id);
        }

        return nextColumn;
      });
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return;

    if (!active || !over) return;

    if (active.id !== over?.id) {
      const oldIndex = orderColumns.findIndex((c) => c._id === active.id);

      const newIndex = orderColumns.findIndex((c) => c._id === over.id);
      setOrderColumns(arrayMove(orderColumns, oldIndex, newIndex));
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
