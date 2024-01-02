import { Board } from "@/app/_types/board.type";
import Button from "@/components/button";
import {
  BoltIcon,
  DownIcon,
  FilterIcon,
  OptionIcon,
  RocketIcon,
  StarIcon,
  TwoPeopleIcon,
  UserPlusIcon,
} from "@/components/icons/icons";

function BoardBar({ board }: { board: Board }) {
  return (
    <div className="flex justify-between items-center gap-2 pl-4 py-3 pr-[10px] boardBar--background">
      <span className="flex items-center">
        <h1 className="font-extrabold text-lg text-white">
          {board?.description}
        </h1>
        <Button className="hover:rounded-full hover:scale-110">
          <StarIcon className="w-4" />
        </Button>
        <Button className="hover:rounded-full">
          <TwoPeopleIcon className="w-4" />
        </Button>

        <Button className="p-1 w-20 bg-slate-200" size="inline">
          <span className="font-semibold text-slate-700">Bảng</span>
          <DownIcon className="w-5 ml-2 mt-[2px]" />
        </Button>
      </span>

      <span className="flex items-center">
        <Button className="hover:rounded-full">
          <RocketIcon className="w-4" />
        </Button>

        <Button className="hover:rounded-full">
          <BoltIcon className="w-4" />
        </Button>

        <Button size="inline" className="p-2">
          <FilterIcon className="w-4 mx-1" />
          <span className="font-sm text-white ">Bộ lọc</span>
        </Button>

        <span className="w-[1px] h-4 m-1 bg-slate-800"></span>

        <div className="flex justify-center items-center">
          <Button className="hover:rounded-full">
            <span></span>
          </Button>
        </div>

        <Button
          size="inline"
          className="p-2 bg-slate-200 rounded-sm hover:bg-#fff hover:rounded-sm"
        >
          <UserPlusIcon className="w-5" />
          <span className="font-semibold ml-1">Chia sẻ</span>
        </Button>

        <Button>
          <OptionIcon className="w-6" />
        </Button>
      </span>
    </div>
  );
}

export default BoardBar;
