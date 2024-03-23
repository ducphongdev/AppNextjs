import { ITask } from '@/types/board.type';
import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskByCard } from '../card/cardSlice';

export const createNewTask = createAsyncThunk(
  'task/createTask',
  async (dataCreate: any, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataCreate),
    });
    const result = (await response.json()) as ITask;
    thunkApi.dispatch(addTaskByCard(result));
    return result;
  }
);
