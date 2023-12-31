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
        <div className="container h-full mx-auto">
          <Header />
          {/* <ThemeSwitch /> */}
          <div className="w-full bg-gray-700 h-screen">{children}</div>
        </div>
      </Providers>
    </>
  );
}
