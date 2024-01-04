"use client";
import { arrayMove } from "@dnd-kit/sortable";
import { mapOrder } from "@/app/_utils/sorts";
import ListColumns from "./list-columns/list-columns";
import { Board, Columns } from "@/app/_types/board.type";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useId, useState } from "react";

interface ListBoardProps {
  board: Board;
}

function BoardContent({ board }: ListBoardProps) {
  const id = useId();
  const [orderColumns, setOrderColumns] = useState<Columns[]>([]);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    const mapOrderColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      "_id"
    ) as Columns[];
    setOrderColumns(mapOrderColumns);
  }, [board]);

  const handleDragEnd = (e: DragEndEvent) => {
    console.log("click");
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = orderColumns.findIndex((c) => c._id === active.id);

      const newIndex = orderColumns.findIndex((c) => c._id === over.id);
      setOrderColumns(arrayMove(orderColumns, oldIndex, newIndex));
    }
  };

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="absolute inset-0 p-4 h-full overflow-x-auto">
        <ListColumns columns={orderColumns} />
      </div>
    </DndContext>
  );
}

export default BoardContent;
