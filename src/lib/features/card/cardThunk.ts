import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cards } from '@/types/board.type';

export const createNewCard = createAsyncThunk('board/createCard', async (newCardData, thunkApi) => {
  const response = await fetch(`${API_ROOT}/v1/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCardData),
  });
  return (await response.json()) as Cards;
});
