import { mapOrder } from "@/app/_utils/sorts";
import ListColumns from "./list-columns/list-columns";
import { Board, Columns } from "@/app/_types/board.type";

interface ListBoardProps {
  board: Board;
}

function BoardContent({ board }: ListBoardProps) {
  // Sort
  const orderColumns = mapOrder(
    board?.columns,
    board?.columnOrderIds,
    "_id"
  ) as Columns[];

  return (
    <div className="absolute inset-0 p-4 h-full overflow-x-auto">
      <ListColumns columns={orderColumns} />
    </div>
  );
}

export default BoardContent;
