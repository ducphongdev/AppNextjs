import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import Task from './Task';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import { updateCardDetails } from '@/lib/features/card/cardThunk';
import { ITask } from '@/types/board.type';
import { updateTasksOrderedIds } from '@/lib/features/card/cardSlice';
import { useSensors } from '@/lib/hooks/useSensors';

function ListTask({ card }: { card: any }) {
  const [orderTasks, setOrderTasks] = useState([]);
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
  const [activeDragItemId, setActiveDragItemId] = useState<any>(null);
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
    const mapOrderColumns = card?.tasks;
    setOrderTasks(mapOrderColumns);
  }, [card]);

  const moveTask = (dndOrderedTasks: ITask[]) => {
    // Cập nhật lại state Task
    const dndOrderedTasksIds = dndOrderedTasks.map((c: any) => c._id);

    dispatch(
      updateTasksOrderedIds({
        dndOrderedTasks,
        dndOrderedTasksIds,
      })
    );
    const updateData = {
      cardId: card?._id,
      dataUpdate: { taskOrderIds: dndOrderedTasksIds },
    };
    dispatch(updateCardDetails(updateData));
  };

  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemData(e?.active?.data?.current);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over) return;

    if (active.id !== over?.id) {
      const oldTaskIndex = orderTasks?.findIndex(
        (c: ITask) => c._id === active.id
      );
      const newTaskIndex = orderTasks?.findIndex(
        (c: ITask) => c._id === over.id
      );

      // Sắp xếp lại orderTask ban đầu (use ArrayMove)
      const dndOrderedTasks = arrayMove(orderTasks, oldTaskIndex, newTaskIndex);

      setOrderTasks(dndOrderedTasks);
      moveTask(dndOrderedTasks);
    }
    setActiveDragItemData(null);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderTasks?.map((c: any) => c._id)}
        strategy={verticalListSortingStrategy}
      >
        {orderTasks?.map((task: any) => <Task key={task?._id} task={task} />)}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragItemId && <Task task={activeDragItemData} />}
      </DragOverlay>
    </DndContext>
  );
}

export default ListTask;
