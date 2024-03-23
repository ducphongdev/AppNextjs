import { ITaskItem } from '@/types/board.type';
import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskItemByCard, updateTaskItemByCard } from '../card/cardSlice';

export const createNewTaskItem = createAsyncThunk(
  'taskItem/createTaskItem',
  async (dataCreate: any, thunkApi) => {
    const { cardId, taskId, newTaskItemData } = dataCreate;
    const response = await fetch(
      `${API_ROOT}/v1/cards/${cardId}/task/${taskId}/taskItem`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskItemData),
      }
    );
    const result = (await response.json()) as ITaskItem;
    thunkApi.dispatch(addTaskItemByCard(result));
    return result;
  }
);

export const updateTaskItem = createAsyncThunk(
  'taskItem/updateTaskItem',
  async (infUpdate: any, thunkApi) => {
    const { cardId, taskId, taskItemId, dataUpdate } = infUpdate;
    thunkApi.dispatch(
      updateTaskItemByCard({
        taskId,
        taskItemId,
        ...dataUpdate,
      })
    );
    const response = await fetch(
      `${API_ROOT}/v1/cards/${cardId}/task/${taskId}/taskItem/${taskItemId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUpdate),
      }
    );

    const result = (await response.json()) as ITaskItem;
    return result;
  }
);
