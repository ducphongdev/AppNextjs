import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Columns } from '@/types/board.type';

export const createNewColumn = createAsyncThunk(
  'board/createColumn',
  async (newColumnData, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColumnData),
    });
    return (await response.json()) as Columns;
  }
);
