import { ClipboardIcon } from '@/components/icons';

interface IMenuItemProps {
  icon: JSX.Element;
  title: string;
  onClick?: () => void;
}

function MenuItem({ icon, title, onClick }: IMenuItemProps) {
  return (
    <a
      href="#"
      className="flex items-center w-[138px] bg-[#A1BDD914] mb-2 p-2 rounded-sm cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <span className="mr-1">{icon}</span>
      <span className="text-sm text-slate-300">{title}</span>
    </a>
  );
}

export default MenuItem;
