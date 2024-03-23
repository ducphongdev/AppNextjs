import { createSlice } from '@reduxjs/toolkit';
import { updateTaskItem } from './taskItemThunk';

const initialState = {
  isLoading: false,
};

export const taskItemSlice = createSlice({
  name: 'taskItemSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTaskItem.pending, (state) => {
      // state.isLoading = true;
    });
    builder.addCase(updateTaskItem.fulfilled, (state, { payload }) => {
      // state.isLoading = false;
    });
    builder.addCase(updateTaskItem.rejected, (state) => {
      // state.isLoading = false;
    });
  },
});
export const {} = taskItemSlice.actions;
export default taskItemSlice.reducer;
