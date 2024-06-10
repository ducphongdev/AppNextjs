'use client';
import Button from '../button';
import { CloseIcon } from '../icons';

interface IConfirm {
  handleCloseModal?: () => void;
  handleDeleteTask?: () => void;
}

function ConfirmDelete({ handleCloseModal, handleDeleteTask }: IConfirm) {
  return (
    <div className="w-[304px] ">
      <div className=" relative flex items-center justify-center px-8 py-1">
        <h3 className="text-sm font-semibold leading-8 text-center text-slate-300">
          Bạn muốn xóa việc cần làm?
        </h3>
        <p
          className="absolute right-0 p-1 cursor-pointer"
          onClick={handleCloseModal}
        >
          <CloseIcon className="w-5 text-slate-300" />
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-slate-300 text-sm">
          Danh sách công việc sẽ bị xoá vĩnh viễn và không bao giờ lấy lại được.
        </p>

        <Button
          onClick={handleDeleteTask}
          size="full"
          variant="error"
          className="rounded-sm py-2"
        >
          Xóa danh sách công việc
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
