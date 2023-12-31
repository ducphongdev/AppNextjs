import BoardContent from "./_components/boardContent";

function Board() {
  return (
    <div className="absolute inset-0 p-4 h-full overflow-x-auto">
      <BoardContent />
    </div>
  );
}

export default Board;
