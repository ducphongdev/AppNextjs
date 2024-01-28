import { DuplicateIcon, HomeIcon, TableIcon } from '@/components/icons/icons';

function Sidebar() {
  return (
    <nav className="mt-10 px-4 col-span-1">
      <div>
        <ul className="list-none pb-1 border-b-[1px] border-gray-500">
          <li className="no-underline flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-200">
            <span>
              <TableIcon className="w-5 text-gray-300" />
            </span>
            <span className="flex-1 text-gray-300 text-sm font-bold ml-1">Bảng</span>
            <span></span>
          </li>
          <li className="no-underline flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-200">
            <span>
              <DuplicateIcon className="w-5 text-gray-300" />
            </span>
            <span className="flex-1 text-gray-300 text-sm font-bold ml-1">Mẫu</span>
            <span></span>
          </li>
          <li className="no-underline flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-200">
            <span>
              <HomeIcon className="w-5 text-gray-300" />
            </span>
            <span className="flex-1 text-gray-300 text-sm font-bold ml-1">Trang chủ</span>
            <span></span>
          </li>
        </ul>
      </div>

      <div>
        <ul className="list-none pb-1 pt-3 mb-10">
          <div className="pl-3 text-gray-300 text-xs font-semibold">Các không gian làm việc</div>
          <li className="no-underline">
            <a href="#" className="flex items-center p-2 mx-3 mb-1 rounded-md cursor-pointer">
              <div className="w-8 h-8 flex items-center">
                <div className="accent-green flex justify-center items-center w-full h-full text-xl rounded-lg text-neutral-950 font-bold">
                  <span>K</span>
                </div>
              </div>
              <p className="text-sm ml-3 font-normal text-gray-300">
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
