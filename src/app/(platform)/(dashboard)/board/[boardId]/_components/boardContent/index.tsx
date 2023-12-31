import Button from "@/componens/button";
import {
  BarsLeftIcon,
  ClockIcon,
  DuplicateIcon,
  OptionIcon,
  PlusIcon,
} from "@/componens/icons/icons";

function BoardContent() {
  return (
    <ol className="flex gap-x-2 h-full overflow-x-auto overflow-y-hidden">
      <li className="px-[6px] pb-3 h-full w-[272px] shrink-0 select-none">
        <div className="flex justify-between max-h-full flex-col w-[272px] rounded-md shadow-md pb-2 bg-[#f1f2f4]">
          {/* Header */}
          <div className="flex justify-between items-center px-2 pt-2 gap-x-2">
            <div className="">
              <h2>Đang làm</h2>
            </div>
            <Button>
              <OptionIcon className="w-4 text-white" />
            </Button>
          </div>

          {/* Column */}
          <ol className="mx-1 px-1 flex flex-col gap-y-2 overflow-x-hidden overflow-y-auto">
            <li className="flex pb-2">
              <div className="w-full rounded-lg cursor-pointer  shadow-sm border-2 border-transparent hover:border-black">
                <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x641/8da45cd6f02259e58cf77cb0c23b6fb7/photo-1702933018110-883638b70eeb.jpg')] bg-white min-h-40 bg-cover rounded-t-md"></div>
                <div className="px-2 pt-2 pb-[2px]">
                  <a href="">Công việc hằng 1</a>
                </div>
                <div className="flex justify-around items-center">
                  <span className="flex justify-between items-center">
                    <span>
                      <ClockIcon className="w-4 mr-1" />
                    </span>
                    <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
                  </span>

                  <span>
                    <BarsLeftIcon className="w-4" />
                  </span>
                </div>
                <div className="px-2">
                  <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
                    <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
                  </Button>
                </div>
              </div>
            </li>

            <li className="flex pb-2">
              <div className="w-full rounded-lg cursor-pointer  shadow-sm border-2 border-transparent hover:border-black">
                <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x641/8da45cd6f02259e58cf77cb0c23b6fb7/photo-1702933018110-883638b70eeb.jpg')] bg-white min-h-40 bg-cover rounded-t-md"></div>
                <div className="px-2 pt-2 pb-[2px]">
                  <a href="">Công việc hằng 1</a>
                </div>
                <div className="flex justify-around items-center">
                  <span className="flex justify-between items-center">
                    <span>
                      <ClockIcon className="w-4 mr-1" />
                    </span>
                    <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
                  </span>

                  <span>
                    <BarsLeftIcon className="w-4" />
                  </span>
                </div>
                <div className="px-2">
                  <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
                    <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
                  </Button>
                </div>
              </div>
            </li>

            <li className="flex pb-2">
              <div className="w-full rounded-lg cursor-pointer  shadow-sm border-2 border-transparent hover:border-black">
                <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x641/8da45cd6f02259e58cf77cb0c23b6fb7/photo-1702933018110-883638b70eeb.jpg')] bg-white min-h-40 bg-cover rounded-t-md"></div>
                <div className="px-2 pt-2 pb-[2px]">
                  <a href="">Công việc hằng 1</a>
                </div>
                <div className="flex justify-around items-center">
                  <span className="flex justify-between items-center">
                    <span>
                      <ClockIcon className="w-4 mr-1" />
                    </span>
                    <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
                  </span>

                  <span>
                    <BarsLeftIcon className="w-4" />
                  </span>
                </div>
                <div className="px-2">
                  <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
                    <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
                  </Button>
                </div>
              </div>
            </li>

            <li className="flex pb-2">
              <div className="w-full rounded-lg cursor-pointer  shadow-sm border-2 border-transparent hover:border-black">
                <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x641/8da45cd6f02259e58cf77cb0c23b6fb7/photo-1702933018110-883638b70eeb.jpg')] bg-white min-h-40 bg-cover rounded-t-md"></div>
                <div className="px-2 pt-2 pb-[2px]">
                  <a href="">Công việc hằng 1</a>
                </div>
                <div className="flex justify-around items-center">
                  <span className="flex justify-between items-center">
                    <span>
                      <ClockIcon className="w-4 mr-1" />
                    </span>
                    <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
                  </span>

                  <span>
                    <BarsLeftIcon className="w-4" />
                  </span>
                </div>
                <div className="px-2">
                  <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
                    <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
                  </Button>
                </div>
              </div>
            </li>
          </ol>

          {/* Footer */}
          <div className="flex justify-between items-center px-2 pt-2">
            <Button
              className="flex-1 justify-start p-1 rounded-md"
              size="inline"
            >
              <PlusIcon className="w-5" />
              <span className="front-sm ml-2">Thêm thẻ</span>
            </Button>
            <Button>
              <DuplicateIcon className="w-5" />
            </Button>
          </div>
        </div>
      </li>
    </ol>
  );
}

export default BoardContent;
