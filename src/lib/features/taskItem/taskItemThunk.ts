import { ITaskItem } from '@/types/board.type';
import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskItemByCard, updateTaskItemByCard } from '../card/cardSlice';
import http from '@/utils/httpRequest';

export const createNewTaskItem = createAsyncThunk(
  'taskItem/createTaskItem',
  async (dataCreate: any, thunkApi) => {
    const { cardId, taskId, newTaskItemData } = dataCreate;
    const response = await http.post(
      `/v1/cards/${cardId}/task/${taskId}/taskItem`,
      newTaskItemData
    );
    thunkApi.dispatch(addTaskItemByCard(response));
    return response;
  }
);

export const updateTaskItem = createAsyncThunk(
  'taskItem/updateTaskItem',
  async (infUpdate: any, thunkApi) => {
    const { cardId, taskId, taskItemId, dataUpdate } = infUpdate;

    try {
      const response = await http.put(
        `/v1/cards/${cardId}/task/${taskId}/taskItem/${taskItemId}`,
        dataUpdate
      );
      thunkApi.dispatch(
        updateTaskItemByCard({
          taskId,
          taskItemId,
          ...dataUpdate,
        })
      );
      return response;
    } catch (error) {
      // thunkApi.rejectWithValue(error.response);
    }
  }
);
