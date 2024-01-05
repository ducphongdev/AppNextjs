import { Cards } from '@/app/_types/board.type';
import Card from './card/card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ListCardsProps {
  cards: Cards[];
}

function ListCards({ cards }: ListCardsProps) {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
      <ol className="mx-1 px-1 flex flex-col gap-y-2 overflow-x-hidden overflow-y-auto">
        {cards?.map((card) => <Card key={card?._id} card={card} />)}
      </ol>
    </SortableContext>
  );
}

export default ListCards;
