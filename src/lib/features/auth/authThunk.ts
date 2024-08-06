import http from '@/utils/httpRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ErrorPayload {
  status?: number;
  message?: string;
}
export const loginAuth = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorPayload }
>('login/loginAuth', async (infoUser: any, thunkApi) => {
  try {
    const response = await http.post(`/v1/auth/login`, infoUser, {
      credentials: 'include',
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as ErrorPayload);
  }
});

export const logoutAuth = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorPayload }
>('login/logoutAuth', async (_, thunkApi) => {
  try {
    const response = await http.post(`/v1/auth/logout`, _, {
      credentials: 'include',
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as ErrorPayload);
  }
});
