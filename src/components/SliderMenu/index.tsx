import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import {
  ClipboardIcon,
  ClockIcon,
  PaperIcon,
  TagIcon,
  UserIcon,
  UserPlusIcon,
} from '../icons';
import { useClickAway } from '@/lib/hooks/useClickAway';
import {
  toggleModalAddTask,
  openModalDate,
  toggleModalTimeCard,
  setModalTimeCard,
  setModalModalAddTask,
} from '@/lib/features/modal/modalSlice';
import ModalTimeCard from '../ModalTimeCard';
import ModalAddTask from '../ModalAddTask';
import MenuItem from './MenuItem';
import PopOver from '@/lib/PopOver';

interface IPropsMenu {
  handleAddTask: (title: string | undefined) => void;
}

function SliderMenu({ handleAddTask }: IPropsMenu) {
  const dispatch = useAppDispatch();
  const { isOpenModalTimeCard, isOpenModalAddTask } = useAppSelector(
    (state) => state.modal
  );

  return (
    <div className="float-right pl-2 pr-4">
      <div className="mb-4">
        <h3 className="text-xs text-slate-300 mb-2">Đã gợi ý</h3>
        <a
          href="#"
          className="flex items-center w-[138px] bg-[#A1BDD914] p-2 rounded-sm cursor-pointer overflow-hidden"
        >
          <span className="mr-1">
            <UserPlusIcon className="w-4" />
          </span>
          <span className="text-sm text-slate-300">Tham gia</span>
        </a>
      </div>

      <div className="mb-4">
        <h3 className="text-xs text-slate-300 mb-2">Thêm vào thẻ</h3>

        <MenuItem icon={<UserIcon className="w-4" />} title="Thành viên" />

        <MenuItem icon={<TagIcon className="w-4" />} title="Nhãn" />

        <PopOver
          content={
            <ModalAddTask
              handleAddTask={handleAddTask}
              handleClose={() => dispatch(setModalModalAddTask(false))}
            />
          }
          placement="bottomLeft"
          open={isOpenModalAddTask}
          onChange={(isOpen: boolean) => dispatch(setModalModalAddTask(isOpen))}
        >
          <MenuItem
            icon={<ClipboardIcon className="w-4" />}
            title="Việc cần làm"
            onClick={() => dispatch(toggleModalAddTask(isOpenModalAddTask))}
          />
        </PopOver>

        <PopOver
          content={
            <ModalTimeCard
              handleClose={() => dispatch(setModalTimeCard(false))}
            />
          }
          placement="bottomLeft"
          open={isOpenModalTimeCard}
          onChange={(isOpen: boolean) => {
            dispatch(setModalTimeCard(isOpen));
          }}
        >
          <MenuItem
            icon={<ClockIcon className="w-4" />}
            title="Ngày"
            onClick={() => dispatch(toggleModalTimeCard(isOpenModalTimeCard))}
          />
        </PopOver>

        <MenuItem icon={<PaperIcon className="w-4" />} title="Đính kèm" />
      </div>
    </div>
  );
}

export default SliderMenu;
