import { createSlice } from '@reduxjs/toolkit';
import { createNewColumn } from './columnThunk';
import { Columns } from '@/types/board.type';

interface BoardState {
  isLoading: boolean;
  isError: null | string;
  column: Columns | [];
}

const initialState: BoardState = {
  isLoading: false,
  isError: null,
  column: [],
};

export const boardSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNewColumn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      state.column = payload;
    });
    builder.addCase(createNewColumn.rejected, (state, action) => {});
  },
});

export const {} = boardSlice.actions;

export default boardSlice.reducer;
