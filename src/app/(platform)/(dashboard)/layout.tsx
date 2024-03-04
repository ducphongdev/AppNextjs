import type { Metadata } from 'next';
import { Providers } from '../../providers';
import Header from './_components/header';

export const metadata: Metadata = {
  title: 'Table',
  description: 'My table',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <div className="flex flex-col overflow-hidden h-screen bg-[#ffff] dark:bg-[#1d2125]">
          <Header />
          <div className="w-full h-full">{children}</div>
        </div>
      </Providers>
    </>
  );
}
