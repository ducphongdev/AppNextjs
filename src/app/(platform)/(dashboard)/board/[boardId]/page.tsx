'use client';
import BoardContent from './_components/board-content';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { useEffect } from 'react';
import { fetchBoardById } from '@/lib/features/board/boardThunk';
import BoardBar from './_components/board-bar';

function Board({ params }: { params: { boardId: string } }) {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.board);

  useEffect(() => {
    dispatch(fetchBoardById(params.boardId));
  }, [dispatch]);

  if (isLoading) return 'Loading';

  return (
    <>
      <div
        className="relative flex flex-col h-full bg-center bg-cover"
        style={{
          backgroundImage: `url("${boards?.prefs?.full}")`,
        }}
      >
        <BoardBar board={boards} />
        <div className="relative pt-3 h-full">
          <BoardContent board={boards} />
        </div>
      </div>
    </>
  );
}

export default Board;
