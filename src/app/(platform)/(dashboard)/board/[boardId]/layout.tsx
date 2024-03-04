import type { Metadata } from 'next';
import BoardBar from './_components/board-bar';

export const metadata: Metadata = {
  title: 'Table',
  description: 'My table',
};

export default async function BoardIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
