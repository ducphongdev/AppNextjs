import { createSlice } from '@reduxjs/toolkit';

interface Imodal {
  isOpenModalAddBoard: boolean;
  isOpenModalToolbar: boolean;
  isOpenModalDate: boolean;
  isOpenModalAddTask: boolean;
  editing: null | string;
}

const initialState: Imodal = {
  isOpenModalAddBoard: false,
  isOpenModalToolbar: false,
  isOpenModalDate: false,
  isOpenModalAddTask: false,
  editing: null,
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
      state.editing = null;
    },
    openModalDate: (state) => {
      state.isOpenModalDate = true;
    },
    closeModalDate: (state) => {
      state.isOpenModalDate = false;
      state.editing = null;
    },
    toggleModalAddTask: (state, { payload }) => {
      state.isOpenModalAddTask = !payload;
      state.editing = null;
    },
    startEdit: (state, { payload }) => {
      state.editing = payload;
    },
    cancelEdit: (state) => {
      state.editing = null;
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
  toggleModalAddTask,
  startEdit,
  cancelEdit,
} = modalSlice.actions;
export default modalSlice.reducer;
