'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import clsx from 'clsx/lite';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import Button from '../button';
import { CloseIcon, DownIcon, GlobeIcon, LockIcon } from '../icons';
import { createBoard } from '@/lib/features/board/boardThunk';
import { toggleAddBoard } from '@/lib/features/modal/modalSlice';
import { photos } from '@/app/_api/mock-data';

function ModalAddBoard({ nameUser }: { nameUser: { organizationId: string } }) {
  const ulRef: MutableRefObject<HTMLUListElement | null> = useRef(null);
  const titleRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<'public' | 'private'>('public');
  const [prefs, setPrefs] = useState<object>();
  const [isActive, setIsActive] = useState<number | null>(null);
  const { isOpenModalAddBoard } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const permissionOptions = [
    {
      value: 'public',
      label: 'Công khai',
      icon: <GlobeIcon className="w-5 text-slate-400" />,
    },
    {
      value: 'private',
      label: 'Riêng tư',
      icon: <LockIcon className="w-5 text-slate-400" />,
    },
  ];

  const handleOpenModalBox = () => {
    ulRef.current?.classList.toggle('show');
  };

  const handleClickActivePermission = (item: any) => {
    if (titleRef.current) {
      titleRef.current.textContent = item.label;
      setType(item.value);
    }
  };

  const handleSubmitAddBoard = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBoard = {
      title,
      type,
      owner: nameUser.organizationId,
      prefs: prefs,
    };

    dispatch(createBoard(newBoard));
    dispatch(toggleAddBoard(false));
  };

  const handleSelectBackground = (item: any, i: number) => {
    setPrefs(item.prefs);
    setIsActive(i);
  };

  return (
    <div className="absolute top-[-50%] right-full w-[304px] mr-1 bg-[#282E33] rounded-lg">
      <div className="p-5">
        <header className="px-2 py-1 flex items-center">
          <h2 className="flex-1 text-center text-base text-zinc-400">
            Tạo bảng
          </h2>
          <Button
            onClick={() => dispatch(toggleAddBoard(false))}
            className="ml-auto cursor-pointer"
          >
            <CloseIcon className="h-5" />
          </Button>
        </header>
        <div>
          <div className="mb-4">
            <h3 className="text-stone-300 pb-1">Tiêu đề</h3>
            <div className="w-full">
              <ul className="flex justify-start items-start pb-2">
                {photos?.map((item: any, i) => (
                  <li
                    onClick={() => handleSelectBackground(item, i)}
                    className={clsx(
                      'w-16 h-10 mr-2 cursor-pointer relative',
                      isActive === i && 'opacity-active'
                    )}
                    key={i}
                  >
                    {/* <div
                      className="w-full h-full rounded-sm bg-center bg-cover bg-no-repeat"
                      style={{ backgroundImage: `url(${item?.urls?.full})` }}
                    ></div> */}
                    <div className="w-full h-full rounded-sm">
                      <img
                        className="w-full h-full rounded-sm bg-center bg-cover bg-no-repeat"
                        src={item.prefs.small}
                        alt=""
                      />
                    </div>
                  </li>
                ))}
              </ul>
              {/* <ul className="flex justify-start items-start">
                <li className="w-10 h-8 mr-2">
                  <button className="bg-sky-500 w-full h-full rounded-sm"></button>
                </li>
              </ul> */}
            </div>
          </div>

          <form onSubmit={handleSubmitAddBoard}>
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="block text-base text-stone-300 pb-2"
              >
                Tiêu đề bảng
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="p-1 outline-none rounded-sm focus:shadow-line-input"
              />
            </div>

            <div className="mb-4">
              <p className="block text-base text-stone-300 my-2">Quyền xem</p>
              <div
                onClick={handleOpenModalBox}
                className="flex justify-between items-center relative border-2 border-solid border-[#3c4046] p-1 cursor-pointer active:shadow-line-input"
              >
                <span ref={titleRef}>Công khai</span>
                <span>
                  <DownIcon className="h-5" />
                </span>

                <ul
                  ref={ulRef}
                  className="hidden absolute left-0 top-11 w-[100%] rounded-sm box-border bg-[#282E33] border-spacing-4 shadow-border-modal"
                >
                  {permissionOptions.map((item, index) => (
                    <li
                      onClick={() => handleClickActivePermission(item)}
                      className="flex items-center p-2 rounded-sm hover:bg-[#A6C5E229]"
                      key={index}
                    >
                      <div className="p-3">{item.icon}</div>
                      <div className="text-slate-400 text-sm">
                        <div>{item.label}</div>
                        <span className="text-xs text-slate-400">
                          Chỉ các thành viên nhóm mới có thể xem và sửa bảng này
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button size="full" variant="primary" className="py-2">
              Tạo mới
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAddBoard;
