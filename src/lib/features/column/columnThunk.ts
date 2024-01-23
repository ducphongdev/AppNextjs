import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Columns } from '@/types/board.type';
import { addColumnByBoard } from '../board/boardSlice';

export const createNewColumn = createAsyncThunk(
  'column/createColumn',
  async (newColumnData, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColumnData),
    });
    const result = (await response.json()) as Columns;
    thunkApi.dispatch(addColumnByBoard(result));
    return result;
  }
);

export const updateColumnDetails = createAsyncThunk(
  'column/updateColumnDetails',
  async (updateData: any, thunkApi) => {
    const { columnId, dndOrderedCardIds: cardOrderIds } = updateData;

    const response = await fetch(`${API_ROOT}/v1/columns/${columnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardOrderIds }),
    });
    const result = (await response.json()) as Columns;
    // thunkApi.dispatch(addColumnByBoard(result));
    return result;
  }
);
