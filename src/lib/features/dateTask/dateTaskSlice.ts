import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dueComplete: false,
  completionDeadline: false,
  almostExpired: false,
};

export const dateTask = createSlice({
  name: 'timeTask',
  initialState,
  reducers: {
    setIsDueComplete: (state, { payload }) => {
      state.dueComplete = payload;
      state.completionDeadline = false;
      state.almostExpired = false;
    },
    setIsCompletionDeadline: (state) => {
      state.completionDeadline = true;
      state.almostExpired = false;
    },
    setIsAlmostExpired: (state) => {
      state.almostExpired = true;
      state.completionDeadline = false;
    },
    resetIsTaskStatus: (state) => {
      state.almostExpired = false;
      state.completionDeadline = false;
    },
  },
});

export const {
  setIsDueComplete,
  setIsCompletionDeadline,
  setIsAlmostExpired,
  resetIsTaskStatus,
} = dateTask.actions;

export default dateTask.reducer;
