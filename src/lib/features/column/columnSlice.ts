import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    addColumnStart: (state) => {
      state.isLoading = true;
    },

    addBoardSuccess: (state) => {},
    addBoardFailed: (state) => {},
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchColumnById.pending, (state) => {
    // state.isLoading = true;
    // });
    // builder.addCase(fetchColumnById.fulfilled, (state, { payload }) => {});
    // builder.addCase(fetchColumnById.rejected, (state, action) => {});

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

export const { addColumnStart } = boardSlice.actions;

export default boardSlice.reducer;
