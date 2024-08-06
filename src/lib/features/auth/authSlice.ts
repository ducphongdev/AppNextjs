import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@/types/board.type';
import { loginAuth, logoutAuth } from './authThunk';
import storage from '@/utils/storage';

const initialState = {
  isLoading: false,
  isError: false,
  messageError: '',
  user: storage.get(),
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.messageError = '';
      state.user = payload;
      storage.set(payload);
    });
    builder.addCase(loginAuth.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.messageError = payload?.message;
    });

    builder.addCase(logoutAuth.pending, (state) => {});
    builder.addCase(logoutAuth.fulfilled, (state) => {
      storage.set(null);
      state.user = null;
    });
    builder.addCase(logoutAuth.rejected, (state) => {});
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
