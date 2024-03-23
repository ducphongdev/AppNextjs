import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { BarsLeftIcon, ClockIcon } from '@/components/icons';
import { ICard } from '@/types/board.type';
import Button from '@/components/button';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import { openModalToolbar } from '@/lib/features/modal/modalSlice';
import { fetchCardById } from '@/lib/features/card/cardThunk';

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
  const dispatch = useAppDispatch();

  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,
    borderRadius: isDragging ? '8px' : undefined,
  } as React.CSSProperties;

  const handleOpenModalToolbar = (card: ICard | null) => {
    dispatch(openModalToolbar());
    dispatch(fetchCardById(card?._id));
  };

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
        <div className="flex justify-around items-center pb-2">
          <span className="flex justify-between items-center">
            <span>
              <ClockIcon className="w-4 mr-1" />
            </span>
            <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
          </span>

          <span>
            <BarsLeftIcon className="w-4" />
          </span>
          <span></span>
        </div>
        {/* <div className="px-2">
          <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
            <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
          </Button>
        </div> */}
      </div>
    </li>
  );
}

export default Card;
