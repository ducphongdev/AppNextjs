import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard } from '@/types/board.type';

export const fetchAllBoardOfUser = createAsyncThunk(
  'board/fetchAllBoardOfUser',
  async (userName: string, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/member/${userName}`, {
      method: 'GET',
    });
    return (await response.json()) as IBoard[];
  }
);

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (boardId: string, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/${boardId}`, {
      method: 'GET',
    });
    return (await response.json()) as IBoard;
  }
);

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (newBoard: any, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    });
    return (await response.json()) as IBoard;
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
    return (await response.json()) as IBoard;
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
    return (await response.json()) as IBoard;
  }
);
