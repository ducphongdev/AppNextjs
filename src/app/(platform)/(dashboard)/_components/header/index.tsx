'use client';
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

function Header() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <nav className="w-full flex items-center border-[1px] border-[hsla(218,54%,19.6%,0.16)] dark:border-[hsla(211,18%,68%,0.16)] border-solid bg-white dark:bg-[#1d2125] p-1">
      <div className="flex justify-center items-center">
        <AppIcons
          className="text-gray-800 dark:text-gray-300"
          width="20"
          height="20"
        />
        <a className="pl-2 pr-2 cursor-pointer">
          <span className="text-gray-600 dark:text-gray-300 text-xl font-extrabold">
            Trello
          </span>
        </a>
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
        <Button className="ml-2 hover:rounded-full">
          <BellIcon className="w-6 text-gray-600 dark:text-gray-300 hover:text-[#9FADBD]" />
        </Button>

        <Button className="ml-2 hover:rounded-full">
          <QuestionMarkIcon className="w-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-500" />
        </Button>

        <Button className="ml-2 relative hover:rounded-full">
          <Image
            className={'rounded-full'}
            src={user?.avatar}
            fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
            alt="anh user"
          />
        </Button>
      </div>
    </nav>
  );
}

export default Header;
