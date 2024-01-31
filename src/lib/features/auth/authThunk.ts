import { axiosJWT } from '@/utils/httpRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk('login/loginAuth', async (infoUser: any, thunkApi) => {
  const response = await axiosJWT.post('/v1/auth/login', infoUser);
  return response;
});
