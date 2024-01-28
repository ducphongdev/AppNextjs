import Footer from '@/app/(home)/_components/footer';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Table',
  description: 'My table',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <Link href="/">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
          alt="Trello"
          width="200"
          className="mx-auto my-10"
        />
      </Link>
      <section className="">{children}</section>
      <Footer />
    </main>
  );
}
