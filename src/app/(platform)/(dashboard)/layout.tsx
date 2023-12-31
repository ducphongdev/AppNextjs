import type { Metadata } from "next";
import { Providers } from "../../providers";
// import ThemeSwitch from "../../ThemeSwitch";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Table",
  description: "My table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <div className="flex flex-col overflow-hidden bg-gray-700 h-screen">
          <Header />
          {/* <ThemeSwitch /> */}
          <div className="w-full h-full flex flex-col">{children}</div>
        </div>
      </Providers>
    </>
  );
}
