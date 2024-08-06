import { IUser } from '@/types/board.type';

const AUTH_STORAGE_KEY = 'USER';
export default {
  get() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) as string) || {};
    }
    return {};
  },
  set(user: IUser | null) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  },
};
