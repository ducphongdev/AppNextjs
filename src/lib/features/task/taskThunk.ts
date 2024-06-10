import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskByCard } from '../card/cardSlice';
import http from '@/utils/httpRequest';

export const createNewTask = createAsyncThunk(
  'task/createTask',
  async (dataCreate: any, thunkApi) => {
    const response = await http.post(`/v1/tasks`, dataCreate);
    thunkApi.dispatch(addTaskByCard(response));
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId: string, thunkApi) => {
    const response = await http.delete(`/v1/tasks/${taskId}`);
    return response;
  }
);
