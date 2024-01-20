import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBoardById } from './boardThunk';
import { Board } from '@/types/board.type';

interface BoardState {
  isLoading: boolean;
  isError: boolean;
  boards: Board | null;
}

const initialState: BoardState = {
  isLoading: false,
  isError: false,
  boards: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoardStart: (state) => {
      state.isLoading = true;
    },

    addBoardSuccess: (state) => {},
    addBoardFailed: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardById.pending, (state, action) => {});
    builder.addCase(fetchBoardById.fulfilled, (state, { payload }) => {
      state.boards = payload;
    });
    builder.addCase(fetchBoardById.rejected, (state, action) => {});
  },
});

export const { addBoardStart } = boardSlice.actions;

export default boardSlice.reducer;
