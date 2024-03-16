import { ICard } from '@/types/board.type';
import Card from './card/card';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Button from '@/components/button';
import { CloseIcon } from '@/components/icons';
import { useEffect, useRef, useState } from 'react';

interface ListCardsProps {
  cards: ICard[] | undefined;
  openNewCardForm: boolean;
  toggleOpenNewCardForm: () => void;
  createCard: (title: string) => void;
}

function ListCards({
  cards,
  openNewCardForm,
  toggleOpenNewCardForm,
  createCard,
}: ListCardsProps) {
  const [title, setTitle] = useState<string>('');
  const inputCardRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (openNewCardForm && inputCardRef.current) {
      inputCardRef.current.focus();
    }
  }, [openNewCardForm]);

  const handleCreateCard = () => {
    createCard(title);
    setTitle('');
  };

  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <ol className="mx-1 px-1 flex flex-col gap-y-2 overflow-x-hidden overflow-y-auto">
        {cards?.map((card) => <Card key={card?._id} card={card} />)}
        {openNewCardForm && (
          <li className="w-full p-2 rounded-md">
            <form onSubmit={handleCreateCard} className="focus:bg-transparent">
              <input
                className="w-full h-[34px] resize-none rounded-sm p-2 leading-5  font-semibold"
                data-no-dnd="true"
                ref={inputCardRef}
                value={title}
                name="cardTitle"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề cho thẻ này"
              />
              <div className="flex justify-start items-center w-full mt-2">
                <Button
                  className="text-sm text-white bg-sky-700 p-2 ml-0 "
                  variant="box"
                  size="inline"
                  data-no-dnd={true}
                >
                  Thêm danh sách
                </Button>
                <span
                  onClick={toggleOpenNewCardForm}
                  className="rounded-sm p-2 ml-1"
                >
                  <CloseIcon className="w-4" />
                </span>
              </div>
            </form>
          </li>
        )}
      </ol>
    </SortableContext>
  );
}

export default ListCards;
