import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '@/lib/features/board/boardSlice';
import columnReducer from '@/lib/features/column/columnSlice';
import authReducer from '@/lib/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
