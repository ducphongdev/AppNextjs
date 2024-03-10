import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import Button from '@/components/button';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import Column from './column/column';
import { CloseIcon, PlusIcon } from '@/components/icons';
import { Columns } from '@/types/board.type';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { createNewColumn } from '@/lib/features/column/columnThunk';

interface ListColumnProps {
  columns: Columns[];
}

interface addNewColumnProps {
  title: FormDataEntryValue | null;
  boardId: any;
}

function ListColumns({ columns }: ListColumnProps) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.boards);
  const inputColumnRef = useRef<HTMLInputElement | null>(null);

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm);
  };

  useEffect(() => {
    if (openNewColumnForm && inputColumnRef.current) {
      inputColumnRef.current.focus();
    }
  }, [openNewColumnForm]);

  const createColumn = async (formData: FormData) => {
    const addNewColumn: addNewColumnProps = {
      title: title,
      boardId: board?._id,
    };
    dispatch(createNewColumn(addNewColumn));
    setTitle('');
  };

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <ol className="ct-scroll flex gap-x-2 h-full overflow-x-auto overflow-y-hidden">
        {columns?.map((column) => <Column key={column?._id} column={column} />)}
        {openNewColumnForm ? (
          <div className="w-[272px] h-fit rounded-md mx-2 bg-[#ffffff3d] px-[6px] pb-3 shrink-0 select-none">
            <form action={createColumn} className="p-2 focus:bg-transparent">
              <input
                className="w-full h-[34px] resize-none rounded-sm p-2 leading-5 overflow-hidden font-semibold"
                name="column"
                ref={inputColumnRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <div className="flex justify-start items-center w-fullm mt-2">
                <Button
                  className="text-sm text-white bg-sky-700 p-2 ml-0 "
                  variant="box"
                  size="inline"
                >
                  Thêm danh sách
                </Button>
                <Button
                  onClick={toggleOpenNewColumnForm}
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
            className="w-[272px] h-fit rounded-md mx-2 shrink-0 select-none bg-[#ffffff3d]"
            onClick={toggleOpenNewColumnForm}
          >
            <Button className="py-3 ml-0  rounded-md w-full" size="inline">
              <PlusIcon className="w-5" />
              <span className="text-white text-sm ml-2">
                Thêm danh sách khác
              </span>
            </Button>
          </div>
        )}
      </ol>
    </SortableContext>
  );
}
export default ListColumns;
