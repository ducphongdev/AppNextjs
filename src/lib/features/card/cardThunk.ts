import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCardByBoard } from '../board/boardSlice';
import { closeModalDate } from '../modal/modalSlice';
import http from '@/utils/httpRequest';

export const fetchCardById = createAsyncThunk(
  'card/fetchCardById',
  async (cardId: string | undefined, thunkApi) => {
    const response = await http.get(`/v1/cards/${cardId}`);
    return response;
  }
);

export const createNewCard = createAsyncThunk(
  'card/createCard',
  async (newCardData: any, thunkApi) => {
    const response = await http.post(`/v1/cards`, newCardData);
    thunkApi.dispatch(addCardByBoard(response));
    return response;
  }
);

export const updateCardDetails = createAsyncThunk(
  'card/updateCardDetails',
  async (infUpdate: any, thunkApi) => {
    const { cardId, dataUpdate } = infUpdate;
    const response = await http.put(`/v1/cards/${cardId}`, dataUpdate);
    thunkApi.dispatch(closeModalDate());
    return response;
  }
);
