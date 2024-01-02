import { Cards } from "@/app/_types/board.type";
import Card from "./card/card";

interface ListCardsProps {
  cards: Cards[];
}

function ListCards({ cards }: ListCardsProps) {
  return (
    <ol className="mx-1 px-1 flex flex-col gap-y-2 overflow-x-hidden overflow-y-auto">
      {cards?.map((card) => (
        <Card key={card?._id} card={card} />
      ))}
    </ol>
  );
}

export default ListCards;
