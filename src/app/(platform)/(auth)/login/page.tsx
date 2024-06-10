'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Another from '../_component/Another';
import { loginAuth } from '@/lib/features/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useReduxHooks';
import { ErrorIcon } from '@/components/icons';
import Link from 'next/link';

function Login() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { isError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginAuth({
        email,
        password,
      })
    ).then(({ payload }: { payload: any }) => {
      if (payload) {
        // setEmail('');
        // setPassword('');
        router.push(`/organization/${payload?.displayName}`);
      }
    });
  };

  return (
    <div className="mx-auto max-w-[400px] ">
      <div className="bg-white shadow-lg  shadow-indigo-500/40 rounded-sm py-6 px-10">
        <h1 className="mt-1 mb-3 text-base font-extrabold text-gray-500 text-center">
          Đăng nhập vào Trello
        </h1>
        <div className="">
          {isError ? (
            <div className="mb-4">
              <div className="flex items-start p-2 bg-yellow-100 mb">
                <div className="pr-4 pt-2">
                  <ErrorIcon className="w-5 text-red-500" />
                </div>
                <div>
                  <p className="font-extralight text-sm">
                    Địa chỉ email và/hoặc mật khẩu không chính xác. Nếu gần đây
                    bạn di chuyển tài khoản Trello sang tài khoản Atlassian, bạn
                    sẽ cần sử dụng mật khẩu tài khoản Atlassian của mình. Hoặc
                    bạn có thể yêu cầu trợ giúp đăng nhập.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          <form onSubmit={handleLoginUser}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nhập email"
                className="border-[1px] w-full px-2 py-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="border-[1px] w-full px-2 py-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              value="Tiếp tục"
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-md inline-block shadow-lg shadow-cyan-500/50 cursor-pointer"
            />
          </form>

          <Another />
        </div>
        <hr className="h-[1px] w-full bg-gray-400 my-5" />
        <ul className="flex justify-center items-center">
          <li className="text-sm text-sky-500 pr-2">
            <a href="#" className="cursor-pointer">
              Không thể đăng nhập?
            </a>
          </li>
          <li className="text-sm text-sky-500">
            <Link href="/signup" className="cursor-pointer">
              Đăng ký tài khoản
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
