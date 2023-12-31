import { ClockIcon } from "@/componens/icons/icons";

function OrganizationIdPage() {
  return (
    <div className="w-full mt-10 mx-4">
      <div className="pb-5">
        <div className="flex items-center pb-2">
          <span>
            <ClockIcon className="w-6 text-gray-300 mr-2" />
          </span>
          <h3 className="text-sm font-semibold">
            CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
          </h3>
        </div>
        <div>
          <ul className="grid grid-cols-4 gap-2">
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrganizationIdPage;
