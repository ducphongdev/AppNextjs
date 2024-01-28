import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardById, moveCardToDifferentColumn, updateBoardDetails } from './boardThunk';
import { Board } from '@/types/board.type';
import { isEmpty } from 'lodash';
import { generatePlaceholderCard } from '@/utils/formatter';
import { mapOrder } from '@/utils/sorts';

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBoardDetails.pending, (state, action) => {});
    builder.addCase(updateBoardDetails.fulfilled, (state, { payload }) => {});
    builder.addCase(updateBoardDetails.rejected, (state, action) => {});
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
