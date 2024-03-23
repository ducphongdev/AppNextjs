import { ITask } from '@/types/board.type';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
