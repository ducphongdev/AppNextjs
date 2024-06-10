import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/utils/httpRequest';

export const fetchAllBoardOfUser = createAsyncThunk(
  'board/fetchAllBoardOfUser',
  async (userName: string, thunkApi) => {
    const response = await http.get(`/v1/boards/member/${userName}`);
    return response;
  }
);

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (boardId: string, thunkApi) => {
    const response = await http.get(`/v1/boards/${boardId}`);
    return response;
  }
);

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (newBoard: any, thunkApi) => {
    const response = await http.post(`/v1/boards`, newBoard);
    return response;
  }
);

export const updateBoardDetails = createAsyncThunk(
  'board/updateBoardDetails',
  async (infUpdate: any, thunkApi) => {
    const { boardId, dataUpdate } = infUpdate;
    const response = await http.put(`/v1/boards/${boardId}`, dataUpdate);
    return response;
  }
);

export const moveCardToDifferentColumn = createAsyncThunk(
  'board/moveCardToDifferentColumn',
  async (updateData: any, thunkApi) => {
    const response = await http.put(
      `/v1/boards/supports/moving_card`,
      updateData
    );
    return response;
  }
);
