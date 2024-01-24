import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, { payload }) => {
      state.boards = payload;
    },
    addCardByBoard: (state, { payload }) => {
      const newBoard = { ...state.boards };
      const columnToUpdate = newBoard?.columns?.find((column) => column._id === payload.columnId);

      if (columnToUpdate) {
        if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
          columnToUpdate.cards = [payload];
          columnToUpdate.cardOrderIds = [payload._id];
        } else {
          columnToUpdate.cards.push(payload);
          columnToUpdate.cardOrderIds.push(payload._id);
        }
      }
      state.boards = newBoard;
    },

    addColumnByBoard: (state, { payload }) => {
      payload.cards = [generatePlaceholderCard(payload)];
      payload.cardOrderIds = [generatePlaceholderCard(payload)._id];

      state.boards?.columnOrderIds.push(payload._id);
      state.boards?.columns.push(payload);
    },
  },
  extraReducers: (builder) => {
    // GET BOARD
    builder.addCase(fetchBoardById.pending, (state, action) => {});
    builder.addCase(fetchBoardById.fulfilled, (state, { payload }) => {
      payload.columns = mapOrder(payload?.columns, payload?.columnOrderIds, '_id');

      payload.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });
      state.boards = payload;
    });
    builder.addCase(fetchBoardById.rejected, (state, action) => {});

    // UPDATE BOARD
    builder.addCase(updateBoardDetails.pending, (state, action) => {});
    builder.addCase(updateBoardDetails.fulfilled, (state, { payload }) => {});
    builder.addCase(updateBoardDetails.rejected, (state, action) => {});

    // Move Card To Different Column
    builder.addCase(moveCardToDifferentColumn.pending, (state, action) => {});
    builder.addCase(moveCardToDifferentColumn.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(moveCardToDifferentColumn.rejected, (state, action) => {});
  },
});

export const { addBoard, addCardByBoard, addColumnByBoard } = boardSlice.actions;

export default boardSlice.reducer;
