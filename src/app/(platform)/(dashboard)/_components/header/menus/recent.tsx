import { ArrowRightIcon, DownIcon } from '@/components/icons';

function Recent() {
  return (
    <div className="group py-2 px-3 cursor-pointer relative hover:bg-slate-400 my-1">
      <div className="group-hover:bg-slate-400 rounded-sm flex justify-center items-center">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          Gần đây
        </span>
        <DownIcon className="w-4 h-4 ml-1 text-gray-600 dark:text-gray-300" />
      </div>

      <div className="hidden group-hover:block absolute top-[44px] left-0 w-[304px] z-50">
        <div className="flex flex-col bg-white dark:bg-[#1d2125] rounded-sm shadow-md">
          <div className="after:content-[''] after:block after:w-full after:h-3 after:absolute after:top-[-11px]"></div>
          <ul className="list-none pb-1">
            <li className="no-underline flex items-center p-3 hover:bg-gray-700">
              <span className="flex-1 text-gray-600 dark:text-gray-300 text-sm">
                Bảng gần đây
              </span>
              <span>
                <ArrowRightIcon className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-300" />
              </span>
            </li>
            <li className="no-underline flex items-center p-3 hover:bg-gray-700">
              <span className="flex-1 text-gray-600 dark:text-gray-300 text-sm">
                Bảng gần đây
              </span>
              <span>
                <ArrowRightIcon className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-300" />
              </span>
            </li>
            <li className="no-underline flex items-center p-3 hover:bg-gray-700">
              <span className="flex-1 text-gray-600 dark:text-gray-300 text-sm">
                Bảng gần đây
              </span>
              <span>
                <ArrowRightIcon className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-300" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Recent;
