import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cards } from '@/types/board.type';
import { addCardByBoard } from '../board/boardSlice';

export const createNewCard = createAsyncThunk('board/createCard', async (newCardData, thunkApi) => {
  const response = await fetch(`${API_ROOT}/v1/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCardData),
  });
  const result = (await response.json()) as Cards;
  thunkApi.dispatch(addCardByBoard(result));
  return result;
});
