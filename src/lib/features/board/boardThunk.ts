import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Board } from '@/types/board.type';

export const fetchAllBoard = createAsyncThunk(
  'board/fetchAllBoard',
  async (_, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/`, {
      method: 'GET',
    });
    return (await response.json()) as Board[];
  }
);

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (boardId: string, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/${boardId}`, {
      method: 'GET',
    });
    return (await response.json()) as Board;
  }
);

export const updateBoardDetails = createAsyncThunk(
  'board/updateBoardDetails',
  async (infUpdate: any, thunkApi) => {
    const { boardId, dataUpdate } = infUpdate;
    const response = await fetch(`${API_ROOT}/v1/boards/${boardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUpdate),
    });
    return (await response.json()) as Board;
  }
);

export const moveCardToDifferentColumn = createAsyncThunk(
  'board/moveCardToDifferentColumn',
  async (updateData: any, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/supports/moving_card`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return (await response.json()) as Board;
  }
);
