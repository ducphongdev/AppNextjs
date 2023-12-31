import Button from "@/componens/button";
import {
  BoltIcon,
  DownIcon,
  FilterIcon,
  OptionIcon,
  RocketIcon,
  StarIcon,
  TwoPeopleIcon,
  UserPlusIcon,
} from "@/componens/icons/icons";

function BoardBar() {
  return (
    <div className="flex justify-between items-center gap-2 pl-4 py-3 pr-[10px] boardBar--background">
      <span className="flex items-center">
        <h1>Bảng trello của tôi</h1>
        <Button className="hover:rounded-full">
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

        <Button size="inline" className="p-1 bg-slate-200">
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
