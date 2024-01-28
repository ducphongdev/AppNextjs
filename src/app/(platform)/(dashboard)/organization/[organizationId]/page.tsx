import { ClockIcon, StarIcon } from '@/components/icons/icons';

function OrganizationIdPage() {
  return (
    <div className="flex flex-col">
      <div className="pb-5">
        <div className="flex items-center pb-2">
          <span>
            <ClockIcon className="w-6 text-gray-300 mr-2" />
          </span>
          <h3 className="text-sm font-extrabold uppercase text-gray-200">Đã xem gần đây</h3>
        </div>
        <div>
          <ul className="flex flex-wrap justify-start max-w-[825px] w-full">
            <li className="mb-4 mr-3 w-[23.3%]">
              <a href="" className="relative block bg-pink-600 w-full h-24 rounded-md group">
                <span className="absolute inset-0 bg-[#00000026] p-2">
                  <div className="flex flex-col justify-between h-20">
                    <div className="text-base font-semibold max-h-10 w-full overflow-hidden">
                      <div className="">Bảng trello của tôi</div>
                    </div>
                    <div className="flex justify-end">
                      <span className="group-hover">
                        <StarIcon className="w-4" />
                      </span>
                    </div>
                  </div>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pb-5">
        <div className="flex items-center pb-2">
          <h3 className="text-sm font-extrabold uppercase text-gray-200">
            CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
          </h3>
        </div>
        <div>
          <ul className="flex flex-wrap justify-start max-w-[825px] w-full">
            <li className="mb-4 mr-3 w-[23.3%]">
              <a href="" className="relative block bg-pink-600 w-full h-24 rounded-md group">
                <span className="absolute inset-0 bg-[#00000026] p-2">
                  <div className="flex flex-col justify-between h-20">
                    <div className="text-base font-semibold max-h-10 w-full overflow-hidden">
                      <div className="">Bảng trello của tôi</div>
                    </div>
                    <div className="flex justify-end">
                      <span className="group-hover">
                        <StarIcon className="w-4" />
                      </span>
                    </div>
                  </div>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrganizationIdPage;
