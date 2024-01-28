import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk('login/loginAuth');
