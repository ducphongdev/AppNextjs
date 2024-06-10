import Button from '../button';
import { CloseIcon } from '../icons';

function ModalAddUsersToBoard() {
  return (
    <div className="fixed h-screen overflow-auto inset-0 w-full flex items-center justify-center z-20 bg-overlay">
      <div className="relative bg-surface-overlay z-30 rounded-lg">
        <div className="p-5 w-[584px]">
          <header className="max-h-8 my-2 flex items-center justify-between">
            <h2 className="text-base text-zinc-300">Chia sẻ bảng</h2>
            <Button className="ml-auto cursor-pointer">
              <CloseIcon className="h-5" />
            </Button>
          </header>
          <div>
            <div className="flex items-center">
              <div className="grow  mr-4">
                <div className="">
                  <input
                    className="w-full border-none outline-none focus:shadow-line-input shadow-dp-input bg-input rounded-sm px-2 py-1 text-sm text-slate-400"
                    type="text"
                    placeholder="Địa chỉ email hoặc tên"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <Button className="mr-2" size="lg" variant="primary">
                  Thành viên
                </Button>
              </div>

              <Button size="lg" variant="primary">
                Chia sẻ
              </Button>
            </div>

            <ul className="mt-4">
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white">
                  <img className="w-full" src="" alt="" />
                </div>
                <div className="flex flex-col items-start ml-2">
                  <div className="text-sm">
                    <span className="text-slate-300 font-normal">
                      Phong Đức
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-xs text-slate-400 font-normal">
                      @phongtd25
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddUsersToBoard;
