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
    <div>
      <BoardBar />
      <div>{children}</div>
    </div>
  );
}
