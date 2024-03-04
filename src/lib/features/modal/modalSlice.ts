import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModalAddBoard: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleAddBoard: (state, { payload }) => {
      state.isOpenModalAddBoard = !payload;
    },
    closeModalAddBoard: (state) => {
      state.isOpenModalAddBoard = false;
    },
  },
});

export const { toggleAddBoard, closeModalAddBoard } = modalSlice.actions;
export default modalSlice.reducer;
