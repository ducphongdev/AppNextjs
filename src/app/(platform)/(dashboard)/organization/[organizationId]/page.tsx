'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ClockIcon, StarIcon } from '@/components/icons';
import { fetchAllBoardOfUser } from '@/lib/features/board/boardThunk';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import {
  closeModalAddBoard,
  toggleAddBoard,
} from '@/lib/features/modal/modalSlice';
import ModalAddBoard from '@/components/ModalAddBoard';
import { useClickAway } from '@/lib/hooks/useClickAway';

function OrganizationIdPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const listBoards = useAppSelector((state) => state.board.listBoards);
  const { isOpenModalAddBoard } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const ref = useClickAway(() => {
    dispatch(closeModalAddBoard());
  });

  useEffect(() => {
    dispatch(fetchAllBoardOfUser(params?.organizationId));
  }, [params?.organizationId]);

  const handleOpenModalAddBoard = () => {
    dispatch(toggleAddBoard(isOpenModalAddBoard));
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="pb-5">
          <div className="flex items-center pb-2">
            <span>
              <ClockIcon className="w-6 text-gray-600 dark:text-gray-300 mr-2" />
            </span>
            <h3 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Đã xem gần đây
            </h3>
          </div>
          <div>
            <ul className="flex flex-wrap justify-start max-w-[825px] w-full">
              <li className="mb-4 mr-3 w-[23.3%]">
                <a
                  href=""
                  className="relative block bg-pink-600 w-full h-24 rounded-md group"
                >
                  <span className="absolute inset-0 bg-[#00000026] p-2">
                    <div className="flex flex-col justify-between h-20">
                      <div className="text-base font-medium max-h-10 w-full overflow-hidden">
                        <div className="">Bảng trello của tôi</div>
                      </div>
                      <div className="flex justify-end">
                        <span className="group-hover">
                          <StarIcon className="w-4" />
                        </span>
                      </div>
                    </div>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pb-5">
          <div className="flex items-center pb-2">
            <h3 className="text-base font-medium uppercase text-gray-600 dark:text-gray-300">
              CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
            </h3>
          </div>
          <div>
            <ul className="flex flex-wrap justify-start max-w-[825px] w-full">
              {listBoards?.map((board) => (
                <li key={board?._id} className="mb-4 mr-3 w-[23.3%]">
                  <Link
                    href={`/board/${board?._id}`}
                    className="relative group block  w-full h-24 rounded-md bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${board?.prefs?.small})`,
                    }}
                  >
                    <span className="absolute inset-0 p-2 rounded-md">
                      <div className="flex flex-col justify-between h-20">
                        <div className="text-base font-medium max-h-10 w-full overflow-hidden">
                          <div className="">{board?.title}</div>
                        </div>
                        <div className="flex justify-end">
                          <span className="group-hover">
                            <StarIcon className="w-4" />
                          </span>
                        </div>
                      </div>
                    </span>
                  </Link>
                </li>
              ))}
              {/* Add board */}
              <li
                ref={ref}
                className="relative mb-4 mr-3 w-[23.3%] cursor-pointer"
              >
                <div className="relative block group bg-gray-200 w-full h-24 rounded-md">
                  <div
                    onClick={handleOpenModalAddBoard}
                    className="h-full p-2 flex justify-center items-center font-normal text-gray-800"
                  >
                    <p>Tạo bảng mới</p>
                  </div>
                </div>
                {isOpenModalAddBoard && <ModalAddBoard nameUser={params} />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationIdPage;
