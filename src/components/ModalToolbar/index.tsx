import { ChangeEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx/lite';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import Image from '../Image';
import Button from '../button';
import {
  BarsThreeIcon,
  CloseIcon,
  DownIcon,
  EyeIcon,
  TableCellsIcon,
} from '../icons';
import {
  cancelEdit,
  setModalModalAddTask,
  toggleModalToolBar,
} from '@/lib/features/modal/modalSlice';
import { updateCardDetails } from '@/lib/features/card/cardThunk';
import { convertDate } from '@/utils/formatter';
import ListTask from '../ListTask';
import { createNewTask } from '@/lib/features/task/taskThunk';
import { useClickAway } from '@/lib/hooks/useClickAway';
import Comment from '../Comment';
import SliderMenu from '../SliderMenu';
import PopOver from '@/lib/PopOver';
import ModalTimeCard from '../ModalTimeCard';

function ModalToolbar({ isExpired }: { isExpired: boolean }) {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const { card, isLoading } = useAppSelector((state) => state.card);

  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const spanRef = useRef<null | HTMLSpanElement>(null);
  const titleDateRef = useRef<null | HTMLHeadingElement>(null);
  const ref = useClickAway(() => setIsOpenDescription(false));

  useEffect(() => {
    if (isOpenDescription && textareaRef.current) {
      textareaRef?.current?.focus();
    }
  }, [isOpenDescription]);

  useEffect(() => {
    const dateElement = spanRef.current as HTMLSpanElement;
    const titleDate = titleDateRef.current as HTMLHeadingElement;
    const dateStart = convertDate(card?.start, 'DD/MM/YY');
    const dateDue = convertDate(card?.due, 'DD/MM/YY [lúc] HH:mm');

    if (dateElement && titleDate) {
      if (dateStart && dateDue) {
        titleDate.innerText = 'Ngày';
        dateElement.innerText = `${dateStart} - ${dateDue}`;
      } else if (dateStart) {
        titleDate.innerText = 'Ngày bắt đầu';
        dateElement.innerText = dateStart;
      } else {
        titleDate.innerText = 'Ngày kết thúc';
        dateElement.innerText = dateDue;
      }
    }
  }, [card]);

  const handleEditDescription = () => {
    setIsOpenDescription(true);
    setDescription(card?.description as string);
    dispatch(cancelEdit());
  };

  const handleCloseModal = () => dispatch(toggleModalToolBar(false));

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    dispatch(
      updateCardDetails({
        cardId: card?._id,
        dataUpdate: { description },
      })
    );
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

  const handleCompleteCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataInfo = {
      cardId: card?._id,
      dataUpdate: {
        dueComplete: (e.target as HTMLInputElement).checked,
      },
    };
    dispatch(updateCardDetails(dataInfo));
  };

  function handleAddTask(title: string | undefined) {
    dispatch(
      createNewTask({
        boardId: card?.boardId,
        cardId: card?._id,
        title,
      })
    );
    dispatch(setModalModalAddTask(false));
  }

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
          <a
            onClick={handleCloseModal}
            className="absolute top-2 right-2 cursor-pointer"
            href="#"
          >
            <CloseIcon className="w-6" />
          </a>
          <div className="min-h-[415px] rounded-lg bg-[#A1BDD914] after:clear-both after:table">
            <div className="min-h-8 items-center py-2 pl-14 pr-[52px]">
              <span
                onClick={() => dispatch(toggleModalToolBar(false))}
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
                    <Button className="relative hover:rounded-full">
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
                  <h3
                    ref={titleDateRef}
                    className="text-sm text-slate-300 mb-1"
                  ></h3>
                  <div className="flex items-center">
                    <span className="mr-1">
                      <input
                        checked={card?.dueComplete}
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer bg-[#22272B] border-none rounded-sm shadow-dp-input"
                        onChange={handleCompleteCard}
                      />
                    </span>
                    <PopOver content={<ModalTimeCard />} placement="bottomLeft">
                      <div className="inline-flex justify-center items-center flex-row bg-[#A1BDD914] p-2 rounded-md cursor-pointer overflow-hidden">
                        <span
                          ref={spanRef}
                          className="text-sm text-slate-400 ml-2 font-semibold"
                        ></span>
                        {card?.dueComplete || isExpired ? (
                          <span
                            className={clsx(
                              'text-sm rounded-sm ml-2 px-1 $',
                              (card?.dueComplete && 'bg-green-600') ||
                                (isExpired && 'bg-red-400')
                            )}
                          >
                            {(card?.dueComplete && 'Hoàn thành') ||
                              (isExpired && 'Hết hạn')}
                          </span>
                        ) : (
                          ''
                        )}
                        <span className="ml-1">
                          <DownIcon className="w-4" />
                        </span>
                      </div>
                    </PopOver>
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
                <Comment />
              </div>
            </div>

            <SliderMenu handleAddTask={handleAddTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalToolbar;
