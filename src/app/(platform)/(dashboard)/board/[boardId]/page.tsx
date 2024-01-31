'use client';
import BoardContent from './_components/board-content';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { useEffect } from 'react';
import { fetchBoardById } from '@/lib/features/board/boardThunk';

function Board({ params }: { params: { boardId: string } }) {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.boards);

  console.log('🚀 ~ board:', board);

  useEffect(() => {
    dispatch(fetchBoardById(params.boardId));
  }, [dispatch]);

  if (!board) return 'Loading';

  return (
    <>
      <BoardContent board={board} />
    </>
  );
}

export default Board;
