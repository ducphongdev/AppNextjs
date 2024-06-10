import type { Metadata } from 'next';
import ThemeRedux from '@/lib/ThemeRedux';
import './globals.css';
import { QueryProvider } from './QueryProvider';
import { ConfigProvider } from 'antd';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <QueryProvider>
          <ThemeRedux>
            <ConfigProvider theme={{ cssVar: true }}>{children}</ConfigProvider>
          </ThemeRedux>
        </QueryProvider>
      </body>
    </html>
  );
}
