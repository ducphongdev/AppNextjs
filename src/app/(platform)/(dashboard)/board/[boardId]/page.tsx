'use client';
import BoardContent from './_components/board-content';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { useEffect } from 'react';
import { fetchBoardById } from '@/lib/features/board/boardThunk';
import BoardBar from './_components/board-bar';
import ModalToolbar from '@/components/ModalToolbar';
import moment from 'moment';
import {
  resetIsTaskStatus,
  setIsAlmostExpired,
  setIsCompletionDeadline,
} from '@/lib/features/dateTask/dateTaskSlice';

function Board({ params }: { params: { boardId: string } }) {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.board);

  const { isOpenModalToolbar } = useAppSelector((state) => state.modal);
  const { card } = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchBoardById(params.boardId));
  }, [dispatch]);

  const handleNotificationStatus = () => {
    const isWithin24Hours = moment(card?.due).isBetween(
      moment(),
      moment().add(24, 'h')
    );

    if (isWithin24Hours) {
      dispatch(setIsAlmostExpired());
    } else if (moment().isAfter(moment(card?.due))) {
      dispatch(setIsCompletionDeadline());
    } else {
      dispatch(resetIsTaskStatus());
    }
  };
  useEffect(() => {
    handleNotificationStatus();
  }, [card]);

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
      {isOpenModalToolbar && <ModalToolbar />}
    </>
  );
}

export default Board;
