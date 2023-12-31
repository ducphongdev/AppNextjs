import type { Metadata } from "next";
import BoardBar from "./_components/boardBar";

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
      <BoardBar />
      <main className="relative pt-3 h-full"> {children}</main>
    </div>
  );
}
