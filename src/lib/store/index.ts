import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '@/lib/features/board/boardSlice';
import columnReducer from '@/lib/features/column/columnSlice';
import cardReducer from '@/lib/features/card/cardSlice';
import taskItemReducer from '@/lib/features/taskItem/taskItemSlice';
import authReducer from '@/lib/features/auth/authSlice';
import modalReducer from '@/lib/features/modal/modalSlice';
import dateTaskReducer from '@/lib/features/dateTask/dateTaskSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer,
    card: cardReducer,
    taskItem: taskItemReducer,
    auth: authReducer,
    modal: modalReducer,
    dateTask: dateTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
