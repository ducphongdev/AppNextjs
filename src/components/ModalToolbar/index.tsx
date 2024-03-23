import { ChangeEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx/lite';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import Image from '../Image';
import Button from '../button';
import {
  BarsThreeIcon,
  ClipboardIcon,
  ClockIcon,
  CloseIcon,
  DownIcon,
  EyeIcon,
  PaperIcon,
  TableCellsIcon,
  TagIcon,
  UserIcon,
  UserPlusIcon,
} from '../icons';
import {
  cancelEdit,
  closeModalToolbar,
  openModalDate,
  toggleModalAddTask,
} from '@/lib/features/modal/modalSlice';
import { updateCardDetails } from '@/lib/features/card/cardThunk';
import ModalTimeCard from '../ModalTimeCard';
import { convertDate } from '@/utils/formatter';
import ListTask from '../ListTask';
import ModalAddTask from '../ModalAddTask';
import { createNewTask } from '@/lib/features/task/taskThunk';
import { useClickAway } from '@/lib/hooks/useClickAway';

function ModalToolbar() {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const { card, isLoading } = useAppSelector((state) => state.card);
  const { isOpenModalDate, isOpenModalAddTask } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { dueComplete, completionDeadline, almostExpired } = useAppSelector(
    (state) => state.dateTask
  );
  const ref = useClickAway(() => setIsOpenDescription(false));

  useEffect(() => {
    if (isOpenDescription && textareaRef.current) {
      textareaRef?.current?.focus();
    }
  }, [isOpenDescription]);

  const handleEditDescription = () => {
    setIsOpenDescription(true);
    setDescription(card?.description as string);
    dispatch(cancelEdit());
  };

  const handleCloseModal = () => dispatch(closeModalToolbar());

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    const infUpdate = {
      cardId: card?._id,
      dataUpdate: { description },
    };
    dispatch(updateCardDetails(infUpdate));
    setIsOpenDescription(false);
  };

  const handleCloseDescription = () => {
    setIsOpenDescription(false);
    setDescription('');
  };

  const handleHiddenDates = () => {
    if (!card?.start && !card?.due) return true;
    return false;
  };

  const handleConvertDates = () => {
    console.log(card);
    const dateStart = convertDate(card?.start, 'DD/MM/YY');
    const dateDue = convertDate(card?.due, 'DD/MM/YY');
    let text = '';

    if (dateStart && dateDue) {
      return (text = `${convertDate(card?.start, 'DD/MM/YY')} - ${convertDate(
        card?.due,
        'DD/MM/YY [lúc] HH:mm'
      )}`);
    }
    if (dateStart) {
      return (text = convertDate(card?.start, 'DD/MM/YY'));
    }
    if (dateDue) {
      return (text = `${convertDate(card?.due, 'DD/MM/YY [lúc] HH:mm')}`);
    }
    return null;
  };

  const handleCompleteCard = (e: React.MouseEvent<HTMLInputElement>) => {
    const dataInfo = {
      cardId: card?._id,
      dataUpdate: {
        dueComplete: (e.target as HTMLInputElement).checked,
      },
    };
    dispatch(updateCardDetails(dataInfo));
  };

  const handleAddTask = (title: string | undefined) => {
    dispatch(
      createNewTask({
        boardId: card?.boardId,
        cardId: card?._id,
        title,
      })
    );
  };

  if (isLoading) return 'Loading';
  return (
    <div
      onClick={handleCloseModal}
      className="fixed h-screen overflow-auto inset-0 w-full flex items-start justify-center z-20 bg-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-12 my-20 relative bg-surface-overlay z-30 w-[768px] rounded-lg"
      >
        <div className="">
          <a className="absolute top-2 right-2 cursor-pointer" href="#">
            <CloseIcon className="w-6" />
          </a>
          <div className="min-h-[415px] rounded-lg bg-[#A1BDD914] after:clear-both after:table">
            <div className="min-h-8 items-center py-2 pl-14 pr-[52px]">
              <span
                onClick={() => dispatch(closeModalToolbar())}
                className="absolute left-6 top-7"
              >
                <TableCellsIcon className="w-6" />
              </span>
              <div className="pt-3">
                <h2 className="h-9 text-xl font-semibold py-1 text-slate-300">
                  {card?.title}
                </h2>
              </div>
              <div>
                <p className="text-sm font-normal text-slate-300">
                  trong danh sách
                  <a className="underline pl-2 cursor-pointer">
                    {card?.columns?.title}
                  </a>
                </p>
              </div>
            </div>

            <div className="min-h-6 px-2 pb-4 w-[552px] relative float-left">
              <div className="float-left mt-2 ml-10">
                <div className="mb-2 mr-4 float-left block">
                  <h3 className="text-sm text-slate-300">Thành viên</h3>
                  <div className="flex items-center pt-1 ml-[-8px]">
                    <Button className="ml-2 relative hover:rounded-full">
                      <Image
                        className={'rounded-full'}
                        fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        alt="anh user"
                      />
                    </Button>
                    <Button className="ml-2 relative hover:rounded-full">
                      <Image
                        className={'rounded-full'}
                        fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        alt="anh user"
                      />
                    </Button>
                    <Button className="ml-2 relative hover:rounded-full">
                      <Image
                        className={'rounded-full'}
                        fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        alt="anh user"
                      />
                    </Button>
                  </div>
                </div>
                <div className="h-16 float-left block mb-2 mr-2">
                  <h3 className="text-sm text-slate-300 mb-1">Thông báo</h3>
                  <a
                    className="flex items-center w-[138px] bg-[#A1BDD914] p-2 rounded-md cursor-pointer overflow-hidden"
                    href="#"
                  >
                    <span>
                      <EyeIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-400 ml-2">
                      Đang theo dõi
                    </span>
                    <span></span>
                  </a>
                </div>
                <div
                  className={clsx(
                    'float-left block mb-2 mr-2 w-full',
                    handleHiddenDates() ? 'hidden' : 'block'
                  )}
                >
                  <h3 className="text-sm text-slate-300 mb-1">Ngày hết hạn</h3>
                  <div className="flex items-center">
                    <span className="mr-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer bg-[#22272B] border-none rounded-sm shadow-dp-input"
                        onClick={handleCompleteCard}
                      />
                    </span>
                    <div>
                      <div className="inline-flex justify-center items-center flex-row bg-[#A1BDD914] p-2 rounded-md cursor-pointer overflow-hidden">
                        <span className="text-sm text-slate-400 ml-2 font-semibold">
                          {handleConvertDates()}
                        </span>
                        {dueComplete || completionDeadline || almostExpired ? (
                          <span
                            className={clsx(
                              'text-sm rounded-sm ml-2 px-1',
                              (dueComplete && 'bg-green-600') ||
                                (completionDeadline && 'bg-red-600') ||
                                (almostExpired && 'bg-yellow-600')
                            )}
                          >
                            {(dueComplete && 'Hoàn Thành') ||
                              (completionDeadline && 'Hết hạn') ||
                              (almostExpired && 'Sắp hết hạn')}
                          </span>
                        ) : (
                          ''
                        )}
                        <span className="ml-1">
                          <DownIcon className="w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={ref} className="float-left mb-2 mr-2 w-full">
                  <div className="relative flex items-center py-2">
                    <span className="absolute left-[-30px] top-2">
                      <BarsThreeIcon className="w-7" />
                    </span>
                    <h3 className="text-sm text-slate-300 mb-1 ml-2">Mô tả</h3>
                    <div className="flex flex-1 justify-between items-center">
                      {card?.description && (
                        <>
                          <div></div>
                          <Button
                            onClick={handleEditDescription}
                            size="inline"
                            variant="box"
                          >
                            Chỉnh sửa
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={clsx(isOpenDescription && 'editing')}>
                    <div
                      onClick={handleEditDescription}
                      className="text-sm text-slate-300 cursor-pointer hide-on-edit"
                    >
                      {card?.description && <p>{card?.description}</p>}
                    </div>
                    <p
                      className={clsx(
                        'w-full',
                        card?.description ? 'hidden' : ''
                      )}
                      onClick={() => {
                        setIsOpenDescription(true);
                        dispatch(cancelEdit());
                      }}
                    >
                      <a
                        href="#"
                        className="block bg-[#A1BDD914] text-sm font-medium rounded text-[#B6C2CF] min-h-12 px-3 py-2 hover:bg-[#A6C5E229] hide-on-edit"
                      >
                        Thêm mô tả chi tiết hơn...
                      </a>
                    </p>
                    <div className="w-full edit">
                      <textarea
                        ref={textareaRef}
                        onChange={handleChangeDescription}
                        value={description}
                        className="text-sm w-full bg-black text-slate-300 px-3 rounded-md py-2"
                      />
                      <div className="flex items-center">
                        <button
                          onClick={handleSaveDescription}
                          className="bg-sky-600 text-black text-sm font-semibold px-3 py-1 rounded-sm"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={handleCloseDescription}
                          className="text-sm rounded-sm hover:bg-[#A6C5E229] mx-2 px-3 py-1"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ListTask card={card} />
                <div className="float-left w-full mb-2 mr-2">
                  <div className="relative flex justify-between items-center mb-1">
                    <span className="absolute left-[-30px] top-1">
                      <BarsThreeIcon className="w-7" />
                    </span>
                    <h3 className="text-base text-slate-400 ml-2">Hoạt động</h3>
                    <div>
                      <Button size="inline" variant="box">
                        Hiện chi tiết
                      </Button>
                    </div>
                  </div>

                  <div className="relative ml-2">
                    <div className="absolute left-[-48px] top-2">
                      <Button className="ml-2 relative hover:rounded-full">
                        <Image
                          className={'rounded-full'}
                          fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                          alt="anh user"
                        />
                      </Button>
                    </div>
                    <div className="rounded-md pt-2">
                      <input
                        className="text-sm w-full bg-input text-slate-300 px-3 rounded-md py-2"
                        placeholder="Viết bình luận"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                <div>
                  <a
                    href="#"
                    className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
                  >
                    <span className="mr-1">
                      <UserIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-300">Thành viên</span>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
                  >
                    <span className="mr-1">
                      <TagIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-300">Nhãn</span>
                  </a>
                </div>

                <div className="relative">
                  <a
                    href="#"
                    className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
                    onClick={() =>
                      dispatch(toggleModalAddTask(isOpenModalAddTask))
                    }
                  >
                    <span className="mr-1">
                      <ClipboardIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-300">Việc cần làm</span>
                  </a>
                  {isOpenModalAddTask && (
                    <ModalAddTask handleAddTask={handleAddTask} />
                  )}
                </div>

                <div>
                  <a
                    href="#"
                    className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
                    onClick={() => dispatch(openModalDate())}
                  >
                    <span className="mr-1">
                      <ClockIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-300">Ngày</span>
                  </a>
                  {isOpenModalDate && <ModalTimeCard />}
                </div>

                <div>
                  <a
                    href="#"
                    className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
                  >
                    <span className="mr-1">
                      <PaperIcon className="w-4" />
                    </span>
                    <span className="text-sm text-slate-300">Đính kèm</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalToolbar;
