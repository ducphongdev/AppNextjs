'use client';
// import { mockData } from '@/app/_api/mock-data';
import BoardContent from './_components/board-content';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { useEffect } from 'react';
import { fetchBoardById } from '@/lib/features/board/boardThunk';

function Board() {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.boards);

  useEffect(() => {
    dispatch(fetchBoardById('65a350feb801e1fc37938908'));
  }, [dispatch]);

  if (!board) return 'Loading';

  return (
    <>
      <BoardContent board={board} />
    </>
  );
}

export default Board;
