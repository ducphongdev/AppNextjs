import { createSlice } from '@reduxjs/toolkit';
import { createNewColumn } from './columnThunk';
import { IColumn } from '@/types/board.type';

interface ColumnState {
  isLoading: boolean;
  isError: null | string;
  column: IColumn | [];
}

const initialState: ColumnState = {
  isLoading: false,
  isError: null,
  column: [],
};

export const columnSlice = createSlice({
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
    });
    builder.addCase(createNewColumn.rejected, (state, action) => {});
  },
});

export const {} = columnSlice.actions;

export default columnSlice.reducer;
