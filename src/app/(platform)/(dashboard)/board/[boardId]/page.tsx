'use client';
import { useEffect } from 'react';
import BoardContent from './_components/board-content';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { fetchBoardById } from '@/lib/features/board/boardThunk';
import BoardBar from './_components/board-bar';
import ModalToolbar from '@/components/ModalToolbar';
import handleNotificationStatus from '@/utils/notificationStatus';
// import ModalAddUsersToBoard from '@/components/ModalAddUsersToBoard';

function Board({ params }: { params: { boardId: string } }) {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.board);
  const { isOpenModalToolbar } = useAppSelector((state) => state.modal);

  const { card } = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(
      fetchBoardById({
        boardId: params?.boardId,
      })
    );
  }, [dispatch]);

  const isExpired = handleNotificationStatus(card);

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
      {isOpenModalToolbar && <ModalToolbar isExpired={isExpired} />}
      {/* <ModalAddUsersToBoard /> */}
    </>
  );
}

export default Board;
