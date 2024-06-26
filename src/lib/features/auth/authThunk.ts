import http from '@/utils/httpRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk(
  'login/loginAuth',
  async (infoUser: any, thunkApi) => {
    const response = await http.post(`/v1/auth/login`, infoUser, {
      credentials: 'include',
    });
    return response;
  }
);
