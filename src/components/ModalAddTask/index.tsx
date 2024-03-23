import { useState } from 'react';
import { toggleModalAddTask } from '@/lib/features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import Button from '../button';
import { CloseIcon } from '../icons';
import { useClickAway } from '@/lib/hooks/useClickAway';

function ModalAddTask({
  handleAddTask,
}: {
  handleAddTask: (title: string | undefined) => void;
}) {
  const [title, setTitle] = useState<string>();
  const dispatch = useAppDispatch();
  const { isOpenModalAddTask } = useAppSelector((state) => state.modal);
  const ref = useClickAway(() =>
    dispatch(toggleModalAddTask(isOpenModalAddTask))
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask(title);
  };

  return (
    <div
      ref={ref}
      className="absolute top-10 right-[-5px] w-[304px] mr-1 bg-[#282E33] rounded-lg z-40"
    >
      <div className="p-5">
        <header className="px-2 flex items-center">
          <h2 className="flex-1 text-center text-sm text-zinc-400">
            Thêm danh sách công việc
          </h2>
          <Button
            onClick={() => dispatch(toggleModalAddTask(isOpenModalAddTask))}
            className="ml-auto cursor-pointer"
          >
            <CloseIcon className="h-5" />
          </Button>
        </header>
        <div>
          <form onSubmit={handleSubmit} action="">
            <div className="flex flex-col">
              <label
                className="text-sm text-slate-300 pb-1 font-semibold"
                htmlFor="titleameTask"
              >
                Tiêu đề
              </label>
              <input
                className="px-2 py-1 text-base- text-slate-400 font-normal border-none outline-none focus:shadow-line-input rounded-sm shadow-dp-input"
                id="titleTask"
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <Button variant={'primary'} size={'lg'} className="mt-4">
              Thêm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAddTask;
