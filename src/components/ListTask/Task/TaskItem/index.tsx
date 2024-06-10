import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { cancelEdit, startEdit } from '@/lib/features/modal/modalSlice';
import { updateCardByBoard } from '@/lib/features/board/boardSlice';
import { updateTaskItem } from '@/lib/features/taskItem/taskItemThunk';
import { ITaskItem } from '@/types/board.type';
import Button from '@/components/button';
import { EllipsisHorizontalIcon } from '@/components/icons';

function TaskItem({ taskItem }: { taskItem: any }) {
  const [titleTaskItem, setTitleTaskItem] = useState<string>();
  const { editing } = useAppSelector((state) => state.modal);
  const { card } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  const handleUpdateStatusTaskItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskItem: ITaskItem
  ) => {
    const isCheck = (e.target as HTMLInputElement).checked;
    if (isCheck) {
      dispatch(
        updateTaskItem({
          cardId: taskItem.cardId,
          taskId: taskItem.taskId,
          taskItemId: taskItem._id,
          dataUpdate: { state: 'complete' },
        })
      );
    } else {
      dispatch(
        updateTaskItem({
          cardId: taskItem.cardId,
          taskId: taskItem.taskId,
          taskItemId: taskItem._id,
          dataUpdate: { state: 'incomplete' },
        })
      );
    }
  };

  useEffect(() => {
    dispatch(updateCardByBoard(card));
  }, [card]);

  const handleUpdateTaskItem = () => {
    dispatch(
      updateTaskItem({
        cardId: taskItem.cardId,
        taskId: taskItem.taskId,
        taskItemId: taskItem._id,
        dataUpdate: { title: titleTaskItem },
      })
    );
    dispatch(cancelEdit());
  };
  return (
    <div className="relative flex items-center mb-2">
      <span className="absolute top-1 left-[-30px]">
        <input
          type="checkbox"
          checked={taskItem?.state === 'complete'}
          className="h-4 w-4 cursor-pointer bg-[#22272B] border-none rounded-sm shadow-dp-input"
          onChange={(e) => handleUpdateStatusTaskItem(e, taskItem)}
        />
      </span>
      <div
        className={clsx(
          'w-full cursor-pointer',
          editing === taskItem?._id && 'editing'
        )}
      >
        <div
          onClick={() => {
            dispatch(startEdit(taskItem?._id));
            setTitleTaskItem(taskItem?.title);
          }}
          className={clsx(
            ' hide-on-edit flex justify-between items-center py-1 px-2  rounded-lg hover:bg-[#A6C5E229]',
            taskItem?.state === 'complete' && 'checklist-item-state-complete'
          )}
        >
          <span className="checklist-item-details-text text-sm text-slate-300 mb-1 pl-2 ">
            {taskItem?.title}
          </span>
          <div className="flex justify-center items-center">
            <Button
              onClick={(e) => e.stopPropagation()}
              className="bg-btn-tdp rounded-full w-6 h-6 ml-2"
            >
              <EllipsisHorizontalIcon className="w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full edit">
          <textarea
            name="name task"
            id=""
            className="w-full px-2 p-1 text-slate-400 text-sm shadow-line-input border-none outline-none rounded-sm bg-input"
            placeholder="Thêm một mục"
            value={titleTaskItem}
            onChange={(e) => setTitleTaskItem(e.target.value)}
          ></textarea>
          <div className="flex items-center">
            <button
              onClick={handleUpdateTaskItem}
              className="bg-sky-600 text-black text-sm font-semibold px-3 py-1 rounded-sm"
            >
              Lưu
            </button>
            <button
              onClick={() => dispatch(cancelEdit())}
              className="text-sm rounded-sm hover:bg-btn-tdp mx-2 px-3 py-1"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
