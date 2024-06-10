import { ICard, ITask, ITaskItem } from '@/types/board.type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCardById, updateCardDetails } from './cardThunk';
import { mapOrder } from '@/utils/sorts';

interface CardState {
  isLoading: boolean;
  isError: boolean;
  card: ICard | null;
}

const initialState: CardState = {
  isLoading: false,
  isError: false,
  card: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateTasksOrderedIds: (state, { payload }) => {
      let newCard = { ...state.card };
      newCard.tasks = payload.dndOrderedTasks;
      newCard.taskOrderIds = payload.dndOrderedTasksIds;
      state.card = newCard as ICard;
    },
    addTaskByCard: (state: any, { payload }) => {
      payload.taskItems = [];
      state.card.taskOrderIds?.push(payload._id);
      state.card.tasks.push(payload);
    },
    deleteTaskByCard: ({ card }, { payload }) => {
      if (card?.badges) {
        const taskToDelete = card.tasks.find(
          (task: ITask) => task._id === payload
        );
        if (taskToDelete) {
          const countTaskItemDele = taskToDelete.taskItems.length;
          card.badges.taskItems = Math.max(
            0,
            card.badges.taskItems - countTaskItemDele
          );
          card.badges.taskItemsChecked = Math.max(
            0,
            card.badges.taskItemsChecked - countTaskItemDele
          );
        }
        card.tasks = card.tasks.filter((task: ITask) => task._id !== payload);
        card.taskOrderIds = card.taskOrderIds?.filter((id) => id !== payload);
      }
    },
    addTaskItemByCard: (state, { payload }) => {
      const cloneCard = { ...state.card };
      if (cloneCard.badges) {
        cloneCard.badges.taskItems += 1;
      }
      const taskToUpdate = cloneCard.tasks.find(
        (task: ITask) => task._id === payload.taskId
      );

      if (taskToUpdate) {
        taskToUpdate.taskItemOrderIds.push(payload._id);
        taskToUpdate.taskItems.push(payload);
      }
      state.card = cloneCard as ICard;
    },
    updateTaskItemByCard: (state, { payload }) => {
      const { taskId, taskItemId, state: itemState } = payload;
      const { card } = state;

      const updatedCard = {
        ...card,
        tasks: card?.tasks.map((task: ITask) =>
          task._id !== taskId
            ? task
            : {
                ...task,
                taskItems: task.taskItems.map((taskItem: ITaskItem) =>
                  taskItem._id !== taskItemId
                    ? taskItem
                    : { ...taskItem, ...payload }
                ),
              }
        ),
        badges: {
          ...card?.badges,
          taskItemsChecked:
            (card?.badges ? card.badges.taskItemsChecked : 0) +
            (itemState === 'complete' ? 1 : -1),
        },
      };
      state.card = updatedCard as ICard;
    },
  },
  extraReducers: (builder) => {
    // GET Card
    builder.addCase(fetchCardById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCardById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      payload.tasks = mapOrder(payload?.tasks, payload?.taskOrderIds, '_id');

      state.card = payload;
    });
    builder.addCase(fetchCardById.rejected, (state) => {
      state.isLoading = false;
    });
    // UPDATE Card
    builder.addCase(updateCardDetails.pending, (state) => {
      // state.isLoading = true;
    });
    builder.addCase(updateCardDetails.fulfilled, (state, { payload }) => {
      state.card = {
        ...state.card,
        ...payload,
      };
    });
    builder.addCase(updateCardDetails.rejected, (state) => {
      // state.isLoading = false;
    });
  },
});

export const {
  updateTasksOrderedIds,
  addTaskByCard,
  deleteTaskByCard,
  addTaskItemByCard,
  updateTaskItemByCard,
} = cardSlice.actions;

export default cardSlice.reducer;
