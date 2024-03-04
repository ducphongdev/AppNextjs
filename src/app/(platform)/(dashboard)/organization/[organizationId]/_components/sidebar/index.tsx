'use client';
import { DuplicateIcon, HomeIcon, TableIcon } from '@/components/icons';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';

function Sidebar() {
  return (
    <nav className="mt-10 px-4 col-span-1">
      <div>
        <Menu>
          <MenuItem
            href={'/organization/ducphong25520002'}
            title="Mẫu"
            activeIcon={<TableIcon className="w-5 " />}
          />
          <MenuItem
            href={'/organion/ducphon'}
            title="Bảng"
            activeIcon={<DuplicateIcon className="w-5 " />}
          />
          <MenuItem
            href={'/orgaion/ducphong255202'}
            title="Trang chủ"
            activeIcon={<HomeIcon className="w-5 " />}
          />
        </Menu>
      </div>

      <div>
        <ul className="list-none pb-1 pt-3 mb-10">
          <div className="pl-3 text-gray-600 dark:text-gray-300 text-xs font-semibold">
            Các không gian làm việc
          </div>
          <li className="no-underline">
            <a
              href="#"
              className="flex items-center p-2 mx-3 mb-1 rounded-md cursor-pointer"
            >
              <div className="w-6 h-6 flex justify-center items-center accent-green text-base font-semibold rounded">
                K
              </div>
              <p className="text-sm ml-3 font-normal text-gray-800 dark:text-gray-300">
                Không gian làm việc của phong đức
              </p>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
