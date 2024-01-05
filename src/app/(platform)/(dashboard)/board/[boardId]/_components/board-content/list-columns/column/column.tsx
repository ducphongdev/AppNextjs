import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '@/components/button';
import { DuplicateIcon, OptionIcon, PlusIcon } from '@/components/icons/icons';
import ListCards from './list-cards/list-cards';
import { Columns } from '@/app/_types/board.type';
import { mapOrder } from '@/app/_utils/sorts';

interface ColumnProps {
  column: Columns | null;
}

function Column({ column }: ColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column?._id as string,
    data: { ...column },
  });

  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : null,
  } as React.CSSProperties;

  // Sorts
  const orderCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');

  return (
    <li
      className="px-[6px] pb-3 h-full w-[272px] shrink-0 select-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        className="flex justify-between max-h-full flex-col w-[272px] rounded-md shadow-md pb-2 bg-[#f1f2f4]"
        {...listeners}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 pt-2 gap-x-2">
          <div className="">
            <h2>{column?.title}</h2>
          </div>
          <Button>
            <OptionIcon className="w-4 text-white" />
          </Button>
        </div>

        {/* List Cart */}
        <ListCards cards={orderCards} />

        {/* Footer */}
        <div className="flex justify-between items-center px-2 pt-2">
          <Button className="flex-1 justify-start p-1 rounded-md" size="inline">
            <PlusIcon className="w-5" />
            <span className="front-sm ml-2">Thêm thẻ</span>
          </Button>
          <Button>
            <DuplicateIcon className="w-5" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Column;
