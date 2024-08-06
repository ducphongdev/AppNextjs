'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks/useReduxHooks';
import Another from '../another';
import { Spin } from 'antd';
import { routerPath } from '@/config/routers';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import { signIn } from 'next-auth/react';
import Message from '../message';

function AuthFormLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
  const { isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/organization/[id]', {
      kind: PrefetchKind.AUTO,
    });
  }, []);

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push(routerPath.home);
      setIsOpenMessage(false);
    } else {
      setIsOpenMessage(true);
    }
  };

  return (
    <>
      {isOpenMessage && (
        <Message messageError={'Mật khẩu hoặc tài khoản không chính xác'} />
      )}
      <form onSubmit={handleLoginUser}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nhập email"
            className="border-[1px] w-full px-2 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="border-[1px] w-full px-2 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`flex justify-center items-center w-full h-10 py-2 ${
            isLoading ? 'bg-gray-300' : 'bg-green-500'
          } text-white font-semibold rounded-md shadow-lg shadow-cyan-500/50 cursor-pointer`}
        >
          {isLoading ? (
            <Spin />
          ) : (
            <input
              className="w-full cursor-pointer"
              value="Tiếp tục"
              type="submit"
            />
          )}
        </div>
      </form>

      <Another />
    </>
  );
}

export default AuthFormLogin;
