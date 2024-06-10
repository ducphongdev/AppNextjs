import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface Imodal {
  isOpenModalAddBoard: boolean;
  isOpenModalToolbar: boolean;
  isOpenModalTimeCard: boolean;
  isOpenModalDate: boolean;
  isOpenModalAddTask: boolean;
  editing: null | string;
}

const initialState: Imodal = {
  isOpenModalAddBoard: false,
  isOpenModalToolbar: false,
  isOpenModalTimeCard: false,
  isOpenModalDate: false,
  isOpenModalAddTask: false,
  editing: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleAddBoard: (state, action: PayloadAction<boolean | undefined>) => {
      const { payload } = action;
      if (payload !== undefined) {
        state.isOpenModalAddBoard = payload;
        return;
      }
      state.isOpenModalAddBoard = !state.isOpenModalAddBoard;
    },

    toggleModalToolBar: (state, action: PayloadAction<boolean | undefined>) => {
      const { payload } = action;
      if (payload !== undefined) {
        state.isOpenModalToolbar = payload;
      } else {
        state.isOpenModalToolbar = !state.isOpenModalToolbar;
      }
      state.isOpenModalDate = false;
      state.editing = null;
    },

    openModalDate: (state) => {
      state.isOpenModalDate = true;
    },
    closeModalDate: (state) => {
      state.isOpenModalDate = false;
      state.editing = null;
    },
    toggleModalAddTask: (state, action: PayloadAction<boolean | undefined>) => {
      const { payload } = action;
      state.isOpenModalAddTask = !payload;
      state.editing = null;
      state.isOpenModalDate = false;
    },
    setModalModalAddTask: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isOpenModalAddTask = payload;
    },
    toggleModalTimeCard: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isOpenModalTimeCard = !payload;
      state.editing = null;
    },
    setModalTimeCard: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isOpenModalTimeCard = payload;
    },
    startEdit: (state, { payload }) => {
      state.editing = payload;
      state.isOpenModalDate = false;
    },
    cancelEdit: (state) => {
      state.editing = null;
    },
  },
});

export const {
  toggleAddBoard,
  toggleModalToolBar,
  toggleModalAddTask,
  setModalModalAddTask,
  openModalDate,
  closeModalDate,
  toggleModalTimeCard,
  setModalTimeCard,
  startEdit,
  cancelEdit,
} = modalSlice.actions;
export default modalSlice.reducer;
