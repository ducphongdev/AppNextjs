'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogoIcon } from '@/components/icons';
import { routerPath } from '@/config/routers';
import { IUser } from '@/types/board.type';

function Header() {
  const { data: session } = useSession();
  const user = session?.user as IUser;

  return (
    <header className="w-full fixed inset-x-0 top-0">
      <nav className="w-full p-4 bg-white flex justify-between items-center">
        <a href="/" className="leading-10">
          <LogoIcon />
        </a>

        <div className="flex">
          {user ? (
            <Link
              href={routerPath.organization.name(user.displayName as string)}
              className="text-base font-semibold px-3 py-2 flex items-center rounded-md bg-[#0065ff] text-white border-indigo-[#80b2ff]"
            >
              Vào bảng tin của bạn
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-base font-semibold p-2 flex items-center text-[#0065ff]"
                prefetch={false}
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                className="text-base font-semibold px-3 py-[1px] flex items-center rounded-md bg-[#0065ff] text-white border-indigo-[#80b2ff]"
                prefetch={false}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
