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
    updateCard: (state, { payload }) => {
      let newCard = { ...state.card };
      newCard.tasks = payload.dndOrderedTasks;
      newCard.taskOrderIds = payload.dndOrderedTasksIds;
      state.card = newCard as ICard;
    },
    addTaskByCard: (state, { payload }) => {
      const cloneCard = { ...state.card };
      cloneCard.taskOrderIds?.push(payload._id);
      cloneCard.tasks.push(payload);
      state.card = cloneCard as ICard;
    },
    addTaskItemByCard: (state, { payload }) => {
      const cloneCard = { ...state.card };
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
      let cloneCard = { ...state.card };
      const taskToUpdate = cloneCard.tasks.find(
        (task: ITask) => task._id === payload.taskId
      );
      if (taskToUpdate) {
        const taskItemToIndex = taskToUpdate.taskItems.findIndex(
          (taskItem: any) => taskItem._id === payload.taskItemId
        );

        if (taskItemToIndex !== -1) {
          // Tìm thấy taskItem cần update trong mảng taskItems
          taskToUpdate.taskItems[taskItemToIndex] = {
            ...taskToUpdate.taskItems[taskItemToIndex],
            ...payload, // Ghi đè các giá trị từ payload
          };
          state.card = cloneCard as ICard;
        }
      }
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
      // state.isLoading = false;
    });
    builder.addCase(updateCardDetails.rejected, (state) => {
      // state.isLoading = false;
    });
  },
});

export const {
  updateCard,
  addTaskByCard,
  addTaskItemByCard,
  updateTaskItemByCard,
} = cardSlice.actions;
export default cardSlice.reducer;
