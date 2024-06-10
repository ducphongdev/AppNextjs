import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import Button from '../button';
import { CloseIcon } from '../icons';

function ModalAddTask({
  handleAddTask,
  handleClose,
}: {
  handleAddTask: (title: string | undefined) => void;
  handleClose: () => void;
}) {
  const [title, setTitle] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask(title);
  };

  return (
    <div className="w-[304px]">
      <div className="p-5">
        <header className="px-2 flex items-center">
          <h2 className="flex-1 text-center text-sm text-zinc-400">
            Thêm danh sách công việc
          </h2>
          <Button onClick={handleClose} className="ml-auto cursor-pointer">
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
                className="px-2 py-1 text-base text-slate-400 font-normal border-none outline-none focus:shadow-line-input rounded-sm shadow-dp-input"
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
