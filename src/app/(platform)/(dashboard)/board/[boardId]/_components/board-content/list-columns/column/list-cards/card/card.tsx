import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { BarsLeftIcon, ClipboardIcon, ClockIcon } from '@/components/icons';
import { ICard } from '@/types/board.type';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import { toggleModalToolBar } from '@/lib/features/modal/modalSlice';
import { fetchCardById } from '@/lib/features/card/cardThunk';
import { convertDate } from '@/utils/formatter';
import { useEffect, useRef } from 'react';
import handleNotificationStatus from '@/utils/notificationStatus';

interface CardProps {
  card: ICard | null;
}

function Card({ card }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card?._id as string,
    data: { ...card },
  });
  const dateRef = useRef<null | HTMLSpanElement>(null);
  const dispatch = useAppDispatch();
  const { taskItemsChecked, taskItems } = card?.badges || {};

  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,
    borderRadius: isDragging ? '8px' : undefined,
  } as React.CSSProperties;

  const isExpired = handleNotificationStatus(card);

  const handleOpenModalToolbar = (card: ICard | null) => {
    dispatch(toggleModalToolBar(true));
    dispatch(fetchCardById(card?._id));
  };

  useEffect(() => {
    const dateElement = dateRef.current as HTMLSpanElement;
    const dateStart = convertDate(card?.start, 'DD/MM/YY');
    const dateDue = convertDate(card?.due, 'DD/MM/YY');

    if (dateElement) {
      if (dateStart && dateDue) {
        dateElement.innerText = `${dateStart} - ${dateDue}`;
      } else if (dateStart) {
        dateElement.innerText = dateStart;
      } else {
        dateElement.innerText = dateDue;
      }
    }
  }, [card]);

  return (
    <li
      className="flex"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => handleOpenModalToolbar(card)}
    >
      <div
        className="card-item w-full h-full rounded-lg cursor-pointer border-2 bg-white dark:bg-[#22272b] border-transparent hover:border-black"
        style={{
          display: `${card?.FE_PlaceholderCard ? 'none' : 'unset'}`,
        }}
      >
        {card?.cover && (
          <div
            className="bg-white min-h-40 bg-cover rounded-t-md"
            style={{ backgroundImage: `url(${card?.cover})` }}
          ></div>
        )}
        <div className="px-2 p-1">
          <a href="" className="text-sm text-slate-300">
            {card?.title}
          </a>
        </div>
        <div className="flex items-center flex-wrap gap-1 pb-2 px-3">
          {card?.badges?.start || card?.badges?.due ? (
            <span
              className={`flex justify-between items-center p-2 py-1 rounded-sm ${
                (card?.dueComplete && 'bg-green-600') ||
                (isExpired && 'bg-red-400')
              }`}
            >
              <span>
                <ClockIcon className="text-complete w-4 mr-1 text-slate-300" />
              </span>
              <span
                ref={dateRef}
                className="text-complete text-xs text-slate-300"
              ></span>
            </span>
          ) : (
            ''
          )}

          {card?.badges?.description && (
            <span>
              <BarsLeftIcon className="w-4" />
            </span>
          )}

          {card?.badges?.taskItems ? (
            <span
              className={`flex items-center rounded-sm p-1 ml-1 ${
                taskItemsChecked === taskItems ? 'bg-green-wrapper' : ''
              }`}
            >
              <span>
                <ClipboardIcon className="text-complete w-4 text-slate-300" />
              </span>
              <span className="text-complete text-xs text-slate-300">
                {`${taskItemsChecked}/${taskItems}`}
              </span>
            </span>
          ) : (
            ''
          )}
        </div>
        {/* <div className="px-2">
          <div className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
            <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
          </div>
        </div> */}
      </div>
    </li>
  );
}

export default Card;
