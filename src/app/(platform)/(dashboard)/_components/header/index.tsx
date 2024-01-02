import {
  AppIcons,
  BellIcon,
  PlusIcon,
  QuestionMarkIcon,
  SearchIcon,
} from "@/components/icons/icons";
import Workspaces from "./menus/workspaces";
import Recent from "./menus/recent";
import Button from "@/components/button";

function Header() {
  return (
    <div className="w-full flex items-center bg-[#1d2125] p-2">
      <div className="flex justify-center items-center">
        <AppIcons className="text-white" width="20" height="20" />
        <a className="pl-2 pr-2">
          <span className="text-white text-xl font-semibold">Trello</span>
        </a>
      </div>

      <div className="flex items-center">
        <Workspaces />
        <Recent />

        <div className="w-8 h-8 ml-2 flex justify-center items-center cursor-pointer bg-blue-400 rounded-sm hover:bg-blue-300">
          <PlusIcon className="w-6" />
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <div className="w-52 h-8 bg-white flex items-center rounded-sm">
          <span className="pl-1 pr-2">
            <SearchIcon className="w-4 text-gray-600" />
          </span>
          <input
            type="text"
            className="outline-none border-none text-sm w-full pr-4"
            placeholder="Tìm kiếm"
          />
        </div>
        <Button className="ml-2 hover:rounded-full">
          <BellIcon className="w-6 text-white hover:text-[#9FADBD]" />
        </Button>

        <Button className="ml-2 hover:rounded-full">
          <QuestionMarkIcon className="w-6 text-white group-hover:text-gray-500" />
        </Button>

        <Button className="ml-2 hover:rounded-full">
          <span></span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
