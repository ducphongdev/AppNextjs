import { createSlice } from '@reduxjs/toolkit';
import {
  createBoard,
  fetchAllBoardOfUser,
  fetchBoardById,
  moveCardToDifferentColumn,
  updateBoardDetails,
} from './boardThunk';
import { IBoard } from '@/types/board.type';
import { isEmpty } from 'lodash';
import { generatePlaceholderCard } from '@/utils/formatter';
import { mapOrder } from '@/utils/sorts';
interface BoardState {
  isLoading: boolean;
  isError: boolean;
  listBoards: IBoard[];
  boards: IBoard | null;
}

const initialState: BoardState = {
  isLoading: false,
  isError: false,
  listBoards: [],
  boards: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateBoard: (state, { payload }) => {
      let newBoard = { ...state.boards };
      newBoard.columns = payload.dndOrderedColumns;
      newBoard.columnOrderIds = payload.dndOrderedColumnsIds;
      state.boards = newBoard as IBoard;
    },
    addCardByBoard: (state, { payload }) => {
      const newBoard = { ...state.boards };

      const columnToUpdate = newBoard?.columns?.find(
        (column) => column._id === payload.columnId
      );

      if (columnToUpdate) {
        if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
          columnToUpdate.cards = [payload];
          columnToUpdate.cardOrderIds = [payload._id];
        } else {
          columnToUpdate.cards.push(payload);
          columnToUpdate.cardOrderIds.push(payload._id);
        }
      }
      state.boards = newBoard as IBoard;
    },

    addColumnByBoard: (state, { payload }) => {
      if (payload) return;
      payload.cards = [generatePlaceholderCard(payload)];
      payload.cardOrderIds = [generatePlaceholderCard(payload)._id];

      state.boards?.columnOrderIds.push(payload._id);
      state.boards?.columns.push(payload);
    },
    updateCardByBoard: (state, { payload }) => {
      const newBoard = { ...state.boards };
      const columnToUpdate = newBoard?.columns?.find(
        (column) => column._id === payload.columnId
      );

      if (columnToUpdate) {
        const cardToIndex = columnToUpdate.cards.findIndex(
          (card) => card._id === payload._id
        );

        if (cardToIndex !== -1) {
          columnToUpdate.cards[cardToIndex] = payload;
          state.boards = newBoard as IBoard;
        }
      }
    },
  },
  extraReducers: (builder) => {
    // GET ALL BOARD
    builder.addCase(fetchAllBoardOfUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBoardOfUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listBoards = payload;
    });
    builder.addCase(fetchAllBoardOfUser.rejected, (state, action) => {});

    // GET BOARD DETAILS
    builder.addCase(fetchBoardById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      payload.columns = mapOrder(
        payload?.columns,
        payload?.columnOrderIds,
        '_id'
      );

      payload.columns.forEach((column: any) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });
      state.boards = payload;
    });
    builder.addCase(fetchBoardById.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Create BOARD
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listBoards.push(payload);
    });
    builder.addCase(createBoard.rejected, (state, action) => {});

    // UPDATE BOARD
    builder.addCase(updateBoardDetails.pending, (state, action) => {});
    builder.addCase(updateBoardDetails.fulfilled, (state, { payload }) => {});
    builder.addCase(updateBoardDetails.rejected, (state, action) => {});

    // Move Card To Different Column
    builder.addCase(moveCardToDifferentColumn.pending, (state, action) => {});
    builder.addCase(
      moveCardToDifferentColumn.fulfilled,
      (state, { payload }) => {}
    );
    builder.addCase(moveCardToDifferentColumn.rejected, (state, action) => {});
  },
});

export const {
  updateBoard,
  addCardByBoard,
  addColumnByBoard,
  updateCardByBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
