import { ITask } from '@/types/board.type';
import { createSlice } from '@reduxjs/toolkit';
import { deleteTask } from './taskThunk';

interface ITaskInit {
  isLoading: boolean;
  task: null | ITask;
}

const initialState: ITaskInit = {
  isLoading: false,
  task: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
