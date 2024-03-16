import { ICard } from '@/types/board.type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCardById, updateCardDetails } from './cardThunk';

interface CardState {
  isLoading: boolean;
  isError: boolean;
  card: any;
}

const initialState: CardState = {
  isLoading: false,
  isError: false,
  card: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET Card
    builder.addCase(fetchCardById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCardById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.card = payload;
    });
    builder.addCase(fetchCardById.rejected, (state) => {
      state.isLoading = false;
    });
    // UPDATE Card
    builder.addCase(updateCardDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCardDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.card = payload;
    });
    builder.addCase(updateCardDetails.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = cardSlice.actions;
export default cardSlice.reducer;
