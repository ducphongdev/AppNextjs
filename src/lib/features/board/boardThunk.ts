import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/utils/httpRequest';

export const fetchAllBoardOfUser = createAsyncThunk(
  'board/fetchAllBoardOfUser',
  async (data: any, thunkApi) => {
    const { userName, access_token } = data;
    const response = await http.get(`/v1/boards/member/${userName}`, {
      access_token,
    });
    return response;
  }
);

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (data: any, thunkApi) => {
    const { boardId, access_token } = data;

    console.log('🚀 ~ access_token:', access_token);
    const response = await http.get(`/v1/boards/${boardId}`, {
      access_token,
    });
    return response;
  }
);

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (data: any, thunkApi) => {
    const { newBoard, access_token } = data;
    const response = await http.post(`/v1/boards`, newBoard, { access_token });
    return response;
  }
);

export const updateBoardDetails = createAsyncThunk(
  'board/updateBoardDetails',
  async (data: any, thunkApi) => {
    const { boardId, dataUpdate, access_token } = data;
    const response = await http.put(`/v1/boards/${boardId}`, dataUpdate, {
      access_token,
    });
    return response;
  }
);

export const moveCardToDifferentColumn = createAsyncThunk(
  'board/moveCardToDifferentColumn',
  async (data: any, thunkApi) => {
    const { dataUpdate, access_token } = data;
    const response = await http.put(
      `/v1/boards/supports/moving_card`,
      dataUpdate,
      { access_token }
    );
    return response;
  }
);
