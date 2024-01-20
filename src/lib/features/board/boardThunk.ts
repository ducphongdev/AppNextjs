import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Board } from '@/types/board.type';

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (boardId: string, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/boards/${boardId}`, {
      method: 'GET',
    });
    return (await response.json()) as Board;
  }
);
