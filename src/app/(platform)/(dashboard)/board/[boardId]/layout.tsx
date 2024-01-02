import type { Metadata } from "next";
import BoardBar from "./_components/board-bar";
import { mockData } from "@/app/_api/mock-data";

export const metadata: Metadata = {
  title: "Table",
  description: "My table",
};

export default function BoardIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-full">
      <BoardBar board={mockData?.board} />
      <main className="relative pt-3 h-full"> {children}</main>
    </div>
  );
}
