import { mockData } from "@/app/_api/mock-data";
import BoardContent from "./_components/board-content";

function Board() {
  return (
    <>
      <BoardContent board={mockData?.board} />
    </>
  );
}

export default Board;
