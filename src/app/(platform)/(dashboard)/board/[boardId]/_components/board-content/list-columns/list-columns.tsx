import Button from "@/components/button";
import Column from "./column/column";
import { PlusIcon } from "@/components/icons/icons";
import { Columns } from "@/app/_types/board.type";

interface ListColumnProps {
  columns: Columns[];
}

function ListColumns({ columns }: ListColumnProps) {
  return (
    <ol className="ct-scroll flex gap-x-2 h-full overflow-x-auto overflow-y-hidden">
      {columns?.map((column) => (
        <Column key={column?._id} column={column} />
      ))}
      <div className="min-w-52 max-w-52 h-fit rounded-md mx-2 bg-[#ffffff3d]">
        <Button className="py-3 ml-0" size="full">
          <PlusIcon className="w-5" />
          <span className="text-white text-sm ml-2">Thêm danh sách khác</span>
        </Button>
      </div>
    </ol>
  );
}
export default ListColumns;
