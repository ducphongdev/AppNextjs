import Button from '../button';
import { CloseIcon, DownIcon } from '../icons';

function ModalAddBoard() {
  return (
    <div className="fixed inset-[100.8px 364.8px auto auto] w-[304px] bg-[#282E33] rounded-lg">
      <div className="p-5">
        <div className="px-2 py-1 flex items-center">
          <h2 className="flex-1 text-center text-base text-zinc-400">
            Tạo bảng
          </h2>
          <Button className="ml-auto cursor-pointer">
            <CloseIcon className="h-5" />
          </Button>
        </div>
        <form>
          <div className="flex flex-col">
            <label className="block text-base text-stone-300 pb-2" htmlFor="">
              Tiêu đề bảng
            </label>
            <input
              type="text"
              className="p-1 outline-none rounded-sm focus:shadow-line-input"
            />
          </div>

          <div className="my-2">
            <label className="block text-base text-stone-300 my-2" htmlFor="">
              Quyền xem
            </label>
            <div className="flex justify-between items-center border-2 border-solid border-slate-600 p-2 cursor-pointer active:shadow-line-input">
              <span>Không gian làm việc</span>
              <span>
                <DownIcon className="h-5" />
              </span>
            </div>
          </div>

          <Button size="full" variant="transparent" className="py-2">
            Tạo mới
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddBoard;
