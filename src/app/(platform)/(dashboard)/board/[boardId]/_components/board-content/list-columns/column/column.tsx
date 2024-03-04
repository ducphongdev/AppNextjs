import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '@/components/button';
import {
  CloseIcon,
  DuplicateIcon,
  OptionIcon,
  PlusIcon,
} from '@/components/icons';
import ListCards from './list-cards/list-cards';
import { Columns } from '@/types/board.type';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { createNewCard } from '@/lib/features/card/cardThunk';

interface ColumnProps {
  column: Columns | null;
}

function Column({ column }: ColumnProps) {
  const [title, setTitle] = useState<string>('');
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

  const createCard = async () => {
    const addNewCard = {
      title: title,
      columnId: column?._id,
      boardId: board?._id,
    };

    dispatch(createNewCard(addNewCard));

    toggleOpenNewCardForm();
    setTitle('');
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
        <div className="flex justify-between items-center px-2 pt-2 gap-x-2">
          <div>
            <h2 className="text-gray-800 dark:text-gray-200">
              {column?.title}
            </h2>
          </div>
          <Button>
            <OptionIcon className="w-4 text-white" />
          </Button>
        </div>

        {/* List Cart */}
        <ListCards cards={orderCards} />

        {/* Footer */}
        {openNewCardForm ? (
          <div className="w-full h-fit rounded-md bg-[#ffffff3d]">
            <form action={createCard} className="p-2 focus:bg-transparent">
              <input
                className="w-full h-[34px] resize-none rounded-sm p-2 leading-5  font-semibold"
                data-no-dnd="true"
                value={title}
                name="cardTitle"
                onChange={(e) => setTitle(e.target.value)}
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
                <Button
                  onClick={toggleOpenNewCardForm}
                  className="rounded-sm p-2 ml-1"
                  size="inline"
                >
                  <CloseIcon className="w-4" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
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
