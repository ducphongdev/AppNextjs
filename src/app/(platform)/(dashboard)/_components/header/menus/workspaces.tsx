import { DownIcon } from '@/components/icons';

function Workspaces() {
  return (
    <div className="group py-2 px-3 cursor-pointer relative hover:bg-slate-400">
      <div className="group-hover:bg-slate-400 rounded-sm text-white  flex justify-center items-center">
        <span className="text-sm">Các không gian làm việc</span>
        <DownIcon className="w-4 h-4 ml-1" />
      </div>

      <div className="hidden group-hover:block absolute top-[44px] left-0 w-[304px] z-50">
        <div className="after:content-[''] after:block after:w-full after:h-3 after:absolute after:top-[-11px]"></div>
        <div className="flex flex-col bg-[#1d2125] rounded-sm shadow-md">
          <h2 className="mt-4 mb-2 mx-5 font-semibold text-[12px] text-gray-300">
            Các không gian làm việc của bạn
          </h2>

          <ul className="list-none pb-1">
            <li className="no-underline">
              <a
                href="#"
                className="flex items-center p-2 mx-3 mb-1 rounded-md cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center">
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
      </div>
    </div>
  );
}

export default Workspaces;
