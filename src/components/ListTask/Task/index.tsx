import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '@/components/button';
import { ClipboardIcon } from '@/components/icons';
import TaskItem from './TaskItem';
import { useAppDispatch } from '@/lib/hooks/useReduxHooks';
import { createNewTaskItem } from '@/lib/features/taskItem/taskItemThunk';
import {
  cancelEdit,
  // toggleModalConfirmModal,
} from '@/lib/features/modal/modalSlice';
import { useClickAway } from '@/lib/hooks/useClickAway';
import ConfirmDelete from '@/components/ConfirmDelete';
import PopOver from '@/lib/PopOver';
import { deleteTask } from '@/lib/features/task/taskThunk';
import { deleteTaskByCard } from '@/lib/features/card/cardSlice';
// import ConfirmDelete from '@/components/ConfirmDelete';

function Task({ task }: { task: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task?._id, data: { ...task } });

  const [isOpenAddTask, setIsOpenAddTask] = useState<boolean>(false);
  const [titleTaskItem, setTitleTaskItem] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : null,
    borderRadius: '6px',
  } as React.CSSProperties;

  const elAddTaskRef = useClickAway(() => setIsOpenAddTask(false));

  const handleOpenModal = () => setIsOpen(!isOpen);
  const handleCloseModal = () => setIsOpen(false);
  const handleVisibleChange = (isOpen: boolean) => setIsOpen(isOpen);

  const handleDeleteTask = () => {
    dispatch(deleteTaskByCard(task?._id));
    dispatch(deleteTask(task?._id));
  };

  const handleAddTaskItem = () => {
    dispatch(
      createNewTaskItem({
        cardId: task.cardId,
        taskId: task._id,
        newTaskItemData: { title: titleTaskItem },
      })
    );
    setIsOpenAddTask(false);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      className="float-left mb-2 mr-2 w-full"
    >
      <div {...listeners} className="relative flex items-center py-2">
        <span className="absolute left-[-30px] top-2">
          <ClipboardIcon className="w-7" />
        </span>
        <h3 className="text-sm text-slate-300 mb-1 ml-2">{task?.title}</h3>
        <div className="flex flex-1 justify-between items-center">
          <div></div>
          <PopOver
            content={
              <ConfirmDelete
                handleCloseModal={handleCloseModal}
                handleDeleteTask={handleDeleteTask}
              />
            }
            placement="bottomLeft"
            open={isOpen}
            onChange={handleVisibleChange}
          >
            <Button
              onClick={handleOpenModal}
              size="inline"
              variant="box"
              data-no-dnd={true}
            >
              Xóa
            </Button>
          </PopOver>
        </div>
      </div>

      {task?.taskItems?.map((taskItem: any) => (
        <TaskItem key={taskItem?._id} taskItem={taskItem} />
      ))}

      <div
        ref={elAddTaskRef}
        className={clsx('cursor-default mt-2', isOpenAddTask && 'editing')}
      >
        <Button
          size={'inline'}
          variant={'box'}
          className="text-slate-300 text-sm hide-on-edit"
          onClick={() => {
            setIsOpenAddTask(true);
            dispatch(cancelEdit());
          }}
        >
          Thêm một mục
        </Button>
        <div className="w-full edit">
          <textarea
            name="name task"
            id=""
            className="w-full px-2 p-1 text-slate-400 text-sm shadow-line-input border-none outline-none rounded-sm bg-input"
            placeholder="Thêm một mục"
            onChange={(e) => setTitleTaskItem(e.target.value)}
          ></textarea>
          <div className="flex items-center">
            <button
              onClick={handleAddTaskItem}
              className="bg-sky-600 text-black text-sm font-semibold px-3 py-1 rounded-sm"
            >
              Lưu
            </button>
            <button
              onClick={() => setIsOpenAddTask(false)}
              className="text-sm rounded-sm hover:bg-[#A6C5E229] mx-2 px-3 py-1"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
