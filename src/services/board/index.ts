import { API_ROOT } from '@/utils/constants';

export const fetchBoardDetails = async (boardId: string) => {
  const res = await fetch(`${API_ROOT}/v1/boards/${boardId}`, {
    method: 'GET',
  });
  return await res.json();
};
