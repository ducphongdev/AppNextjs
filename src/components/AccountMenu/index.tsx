import { signOut } from 'next-auth/react';
import { IUser } from '@/types/board.type';
import Image from '../Image';
import { useRouter } from 'next/navigation';
import { URL_IMG_DEFAULT } from '@/utils/constants';

function AccountMenu({ user }: { user: IUser }) {
  const router = useRouter();

  const handleLogoutAccount = () => {
    signOut({ callbackUrl: '/', redirect: true });
    router.refresh();
  };

  return (
    <div className="max-h-[701px] w-full">
      <div>
        <h2 className="my-4 text-xs font-bold uppercase text-gray-500">
          Tài khoản
        </h2>
        <div className="flex flex-row items-center justify-start p-2">
          <div className="mr-2">
            <Image
              className="rounded-full w-10"
              src={user?.avatar}
              fallBack={URL_IMG_DEFAULT}
              alt="anh user"
            />
          </div>
          <div className="float-start">
            <p className="text-sm text-gray-300">{user?.displayName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="w-full my-2">
          <span className="block w-full cursor-pointer text-left hover:bg-btn-tdp px-2 py-2 text-gray-300">
            Quản lý tài khoản
          </span>
        </div>
      </div>
      <div className="border-t-[1px] border-gray-600">
        <button
          onClick={handleLogoutAccount}
          className=" w-full py-2 px-2 mt-2 text-left text-gray-300 hover:bg-btn-tdp"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default AccountMenu;
