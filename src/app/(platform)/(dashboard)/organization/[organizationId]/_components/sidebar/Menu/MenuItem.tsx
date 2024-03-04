import Link from 'next/link';
import clsx from 'clsx/lite';
import { useActivePath } from '@/lib/hooks/useActivePath';

interface MenuItemProps {
  href: string;
  title: string;
  activeIcon: any;
}

function MenuItem({ href, title, activeIcon }: MenuItemProps) {
  const checkActivePath = useActivePath();

  return (
    <li className="no-underline flex items-center mt-1">
      <Link
        href={href}
        className={clsx(
          'p-3 w-full rounded-md cursor-pointer hover:bg-[#1c2b41]',
          checkActivePath(href) && 'active'
        )}
      >
        <div
          data-selected="true"
          className="flex items-center rounded-md cursor-pointer"
        >
          <span className="text-gray-600 dark:text-gray-300 icon-sidebar">
            {activeIcon}
          </span>
          <span className="flex-1 text-gray-600 dark:text-gray-300 text-sm font-bold ml-1 text-p-name">
            {title}
          </span>
          <span></span>
        </div>
      </Link>
    </li>
  );
}

export default MenuItem;
