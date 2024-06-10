import { createAsyncThunk } from '@reduxjs/toolkit';
import { addColumnByBoard } from '../board/boardSlice';
import http from '@/utils/httpRequest';

interface INewColumnProps {
  title: string;
  boardId: string | undefined;
}

export const createNewColumn = createAsyncThunk(
  'column/createColumn',
  async (newColumnData: INewColumnProps, thunkApi) => {
    const response = await http.post(`/v1/columns`, newColumnData);
    thunkApi.dispatch(addColumnByBoard(response));
    return response;
  }
);

export const updateColumnDetails = createAsyncThunk(
  'column/updateColumnDetails',
  async (updateData: any, thunkApi) => {
    const { columnId, dataUpdate } = updateData;
    const response = await http.put(`/v1/columns/${columnId}`, dataUpdate);
    return response;
  }
);
