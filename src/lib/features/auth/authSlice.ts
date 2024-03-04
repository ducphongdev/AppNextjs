import { createSlice } from '@reduxjs/toolkit';
import { AuthState, IUser } from '@/types/board.type';
import { loginAuth } from './authThunk';

const initialState = {
  isLoading: false,
  isError: false,
  messageError: '',
  user: {},
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
      state.user = payload as IUser;
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.isError = true;
      state.messageError = action?.error?.message;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
