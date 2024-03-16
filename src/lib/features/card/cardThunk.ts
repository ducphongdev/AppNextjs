import { API_ROOT } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ICard } from '@/types/board.type';
import { addCardByBoard } from '../board/boardSlice';
import { setIsDueComplete } from '../dateTask/dateTaskSlice';

export const fetchCardById = createAsyncThunk(
  'board/fetchCardById',
  async (cardId: string | undefined, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/cards/${cardId}`, {
      method: 'GET',
    });
    const result = (await response.json()) as ICard;
    return result;
  }
);

export const createNewCard = createAsyncThunk(
  'board/createCard',
  async (newCardData, thunkApi) => {
    const response = await fetch(`${API_ROOT}/v1/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCardData),
    });
    const result = (await response.json()) as ICard;
    thunkApi.dispatch(addCardByBoard(result));
    return result;
  }
);

export const updateCardDetails = createAsyncThunk(
  'board/updateCardDetails',
  async (infUpdate: any, thunkApi) => {
    const { cardId, dataUpdate } = infUpdate;
    const response = await fetch(`${API_ROOT}/v1/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUpdate),
    });
    const result = (await response.json()) as ICard;
    thunkApi.dispatch(setIsDueComplete(result?.dueComplete));
    return result;
  }
);
