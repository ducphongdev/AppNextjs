import Button from "@/componens/button";
import { OptionIcon } from "@/componens/icons/icons";

function BoardContent() {
  return (
    <div className="mt-1">
      <ol className="flex gap-x-3 h-full">
        <li className="px-[6px] h-full w-[272px] shrink-0 select-none">
          <div className="w-full rounded-md shadow-md pb-2 bg-[#f1f2f4] flex flex-col justify-between ">
            <div className="flex justify-between items-center px-2 pt-2 gap-x-2">
              <div className="">
                <h2>Đang làm</h2>
              </div>
              <Button>
                <OptionIcon className="w-4 text-white" />
              </Button>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}

export default BoardContent;
