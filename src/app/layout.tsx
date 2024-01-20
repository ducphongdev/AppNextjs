import type { Metadata } from 'next';
import ThemeRedux from '@/lib/ThemeRedux';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="">
        <ThemeRedux>{children}</ThemeRedux>
      </body>
    </html>
  );
}
