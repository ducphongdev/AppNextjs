import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '@/components/button';
import { DuplicateIcon, OptionIcon, PlusIcon } from '@/components/icons';
import ListCards from './list-cards/list-cards';
import { IColumn } from '@/types/board.type';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { createNewCard } from '@/lib/features/card/cardThunk';

interface ColumnProps {
  column: IColumn | null;
}

function Column({ column }: ColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column?._id as string,
    data: { ...column },
  });
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.boards);
  const [openNewCardForm, setOpenNewCardForm] = useState<boolean>(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : null,
  } as React.CSSProperties;

  // Sorts
  const orderCards = column?.cards;

  const createCard = async (title: string) => {
    dispatch(
      createNewCard({
        title: title,
        columnId: column?._id,
        boardId: board?._id,
      })
    );
    toggleOpenNewCardForm();
  };

  return (
    <li
      className="px-[6px] pb-3 h-full w-[272px] shrink-0 select-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        className="flex justify-between max-h-full flex-col w-[272px] rounded-lg shadow-md pb-2 bg-[#f1f2f4] dark:bg-black"
        {...listeners}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 pt-2 gap-x-2 mb-2">
          <h2 className="text-gray-800 dark:text-gray-200">{column?.title}</h2>

          <Button data-no-dnd={true} className="rounded-lg hover:bg-btn-tdp">
            <OptionIcon className="w-4 text-white" />
          </Button>
        </div>

        {/* List Cart */}
        <ListCards
          cards={orderCards}
          openNewCardForm={openNewCardForm}
          toggleOpenNewCardForm={toggleOpenNewCardForm}
          createCard={createCard}
        />

        {/* Footer */}
        {!openNewCardForm && (
          <div
            className="flex justify-between items-center px-2 pt-2"
            onClick={toggleOpenNewCardForm}
          >
            <Button
              className="flex-1 justify-start p-1 rounded-md"
              size="inline"
            >
              <PlusIcon className="w-5 dark:text-gray-400" />
              <span className="front-sm ml-2 text-gray-600 dark:text-gray-400">
                Thêm thẻ
              </span>
            </Button>
            <Button>
              <DuplicateIcon className="w-5" />
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Column;
