'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  AppIcons,
  BellIcon,
  PlusIcon,
  QuestionMarkIcon,
  SearchIcon,
} from '@/components/icons';
import Workspaces from './menus/workspaces';
import Recent from './menus/recent';
import Button from '@/components/button';
import ThemeSwitch from '@/app/ThemeSwitch';
import Image from '@/components/Image';
import { useAppSelector } from '@/lib/hooks/useReduxHooks';
import PopOver from '@/lib/PopOver';
import AccountMenu from '@/components/AccountMenu';
import './styles.css';
import { URL_IMG_DEFAULT } from '@/utils/constants';
import Link from 'next/link';
import { routerPath } from '@/config/routers';
import { IUser } from '@/types/board.type';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as IUser;

  const handleOpenModalAccountMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full flex items-center border-[1px] border-[hsla(218,54%,19.6%,0.16)] dark:border-[hsla(211,18%,68%,0.16)] border-solid bg-white dark:bg-[#1d2125] py-1 px-2">
      <div className="flex justify-center items-center">
        <AppIcons
          className="text-gray-800 dark:text-gray-300"
          width="20"
          height="20"
        />
        <Link
          href={routerPath.organization.name(user?.displayName)}
          className="pl-2 pr-2 cursor-pointer"
        >
          <span className="text-gray-600 dark:text-gray-300 text-xl font-extrabold">
            Trello
          </span>
        </Link>
      </div>

      <div className="flex items-center">
        <Workspaces />
        <Recent />

        <div className="w-8 h-8 ml-2 flex justify-center items-center cursor-pointer bg-blue-400 rounded-sm hover:bg-blue-300">
          <PlusIcon className="w-6 text-white" />
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <ThemeSwitch />

        <div className="w-52 h-8 ml-2 border-solid border-[1px] border-[hsla(218,54%,19.6%,0.30)] dark:bg-white flex items-center rounded-sm">
          <span className="pl-1 pr-2">
            <SearchIcon className="w-4 text-black dark:text-gray-600" />
          </span>
          <input
            type="text"
            className="outline-none border-none text-sm text-black w-full pr-4 bg-transparent"
            placeholder="Tìm kiếm"
          />
        </div>
        <Button className="ml-2 rounded-full">
          <BellIcon className="w-6 text-gray-600 dark:text-gray-300 hover:text-white" />
        </Button>

        <Button className="ml-2 rounded-full">
          <QuestionMarkIcon className="w-6 text-gray-600 dark:text-gray-300  hover:text-white" />
        </Button>

        <PopOver
          content={<AccountMenu user={user} />}
          open={isOpen}
          placement="bottomLeft"
          onChange={(isOpen: boolean) => setIsOpen(isOpen)}
        >
          <Button
            className="ml-2 relative rounded-full"
            onClick={handleOpenModalAccountMenu}
          >
            <Image
              className={'rounded-full w-6'}
              src={user?.avatar}
              fallBack={URL_IMG_DEFAULT}
              alt="anh user"
            />
          </Button>
        </PopOver>
      </div>
    </nav>
  );
}

export default Header;
