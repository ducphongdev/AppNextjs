import Link from 'next/link';
import { DownIcon, LogoIcon } from '@/components/icons/icons';

function Header() {
  return (
    <header className="w-full fixed inset-x-0 top-0">
      <nav className="w-full bg-white flex justify-between items-center">
        <a href="" className="p-4">
          <LogoIcon className="w-200" />
        </a>

        <div className="flex">
          <Link
            href="/login"
            className="text-base font-semibold p-2 flex items-center text-[#0065ff]"
          >
            Đăng nhập
          </Link>
          <Link
            href="/signup"
            className="text-base font-semibold px-3 py-[1px] flex items-center rounded-md bg-[#0065ff] text-white border-indigo-[#80b2ff]"
          >
            Đăng ký
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
