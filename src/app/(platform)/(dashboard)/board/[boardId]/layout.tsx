import type { Metadata } from 'next';
import BoardBar from './_components/board-bar';
import { mockData } from '@/app/_api/mock-data';
import { fetchBoardDetails } from '@/services/board';

export const metadata: Metadata = {
  title: 'Table',
  description: 'My table',
};

export default async function BoardIdLayout({ children }: { children: React.ReactNode }) {
  const board = await fetchBoardDetails('65a350feb801e1fc37938908');

  return (
    <div className="relative flex flex-col h-full">
      <BoardBar board={board} />
      <div className="relative pt-3 h-full"> {children}</div>
    </div>
  );
}
