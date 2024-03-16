import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModalAddBoard: false,
  isOpenModalToolbar: false,
  isOpenModalDate: false,
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
    openModalToolbar: (state) => {
      state.isOpenModalToolbar = true;
    },
    closeModalToolbar: (state) => {
      state.isOpenModalToolbar = false;
    },
    openModalDate: (state) => {
      state.isOpenModalDate = true;
    },
    closeModalDate: (state) => {
      state.isOpenModalDate = false;
    },
  },
});

export const {
  toggleAddBoard,
  closeModalAddBoard,
  openModalToolbar,
  closeModalToolbar,
  openModalDate,
  closeModalDate,
} = modalSlice.actions;
export default modalSlice.reducer;
