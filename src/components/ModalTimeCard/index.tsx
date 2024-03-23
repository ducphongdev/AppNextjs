import { useEffect, useState } from 'react';
import clsx from 'clsx/lite';
import moment from 'moment';
import dayjs from 'dayjs';
import Button from '../button';
import { CloseIcon } from '../icons';
import { Calendar, Col, DatePicker, Radio, Row, Select } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { updateCardDetails } from '@/lib/features/card/cardThunk';
import { closeModalDate } from '@/lib/features/modal/modalSlice';
import {
  setIsAlmostExpired,
  setIsCompletionDeadline,
  resetIsTaskStatus,
} from '@/lib/features/dateTask/dateTaskSlice';

dayjs.extend(dayLocaleData);
function ModalTimeCard() {
  const [isDisableDateStart, setIsDisableDateStart] = useState<boolean>(false);
  const [isDisableDateDue, setIsDisableDateDue] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<any>();
  const [dateEnd, setDateEnd] = useState<any>();

  const dispatch = useAppDispatch();
  const { card } = useAppSelector((state) => state.card);
  // const { start, due } = useAppSelector((state) => state.dateTask);

  useEffect(() => {
    // Kiểm tra xem card?.start có tồn tại và có đúng định dạng không
    if (card?.start && moment(card.start).isValid()) {
      setDateStart(dayjs(card.start));
    } else {
      setDateStart(''); // hoặc để giá trị rỗng tùy vào yêu cầu của bạn
    }

    // Tương tự cho dateEnd
    if (card?.due && moment(card.due).isValid()) {
      setDateEnd(dayjs(card.due));
    } else {
      setDateEnd(''); // hoặc để giá trị rỗng tùy vào yêu cầu của bạn
    }
  }, [card]);

  const handleSetDateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = !isDisableDateStart ? dateStart : '';
    const due = !isDisableDateDue ? dateEnd : '';

    dispatch(
      updateCardDetails({
        cardId: card?._id,
        dataUpdate: {
          start,
          due,
        },
      })
    );
  };

  const handleRemoveDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      updateCardDetails({
        cardId: card?._id,
        dataUpdate: {
          start: '',
          due: '',
        },
      })
    );
    setDateStart('');
    setDateEnd('');
  };

  return (
    <div className="absolute top-[170px] right-0 w-[350px] mr-1 bg-[#282E33] rounded-lg z-40">
      <div className="p-5">
        <header className="px-2 flex items-center">
          <h2 className="flex-1 text-center text-base text-zinc-400">Ngày</h2>
          <Button
            onClick={() => dispatch(closeModalDate())}
            className="ml-auto cursor-pointer"
          >
            <CloseIcon className="h-5" />
          </Button>
        </header>
        <div>
          <form onSubmit={handleSetDateCard}>
            <div className="my-4">
              <div className="my-2">
                <div className="mb-2">
                  <label
                    className="block pb-1 text-slate-300 text-sm"
                    htmlFor=""
                  >
                    Ngày bắt đầu
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onClick={() => setIsDisableDateStart((prev) => !prev)}
                      className={clsx(
                        'h-4 w-4 mr-2 cursor-pointer bg-[#22272B] border-none rounded-sm shadow-dp-input',
                        isDisableDateStart && 'bg-input-active'
                      )}
                    />
                    <DatePicker
                      value={dateStart}
                      onChange={(date) => setDateStart(date || '')}
                      disabled={isDisableDateStart}
                      placeholder={'Ngày bắt đầu'}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div>
                    <label
                      className="block pb-1 text-slate-300 text-sm"
                      htmlFor=""
                    >
                      Ngày hết hạn
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className={clsx(
                          'h-4 w-4 mr-2 cursor-pointer bg-[#22272B] border-none rounded-sm shadow-dp-input',
                          isDisableDateDue && 'bg-input-active'
                        )}
                        onClick={() => setIsDisableDateDue((prev) => !prev)}
                      />
                      <DatePicker
                        onChange={(date) => {
                          setDateEnd(date || '');
                        }}
                        value={dateEnd}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={'Ngày hết hạn'}
                        disabled={isDisableDateDue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button size="full" variant="primary" className="py-2 mb-2">
                Lưu
              </Button>
              <Button
                onClick={handleRemoveDate}
                size="full"
                variant="primary"
                className="py-2"
              >
                Gỡ bỏ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalTimeCard;
