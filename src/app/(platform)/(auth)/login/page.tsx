import Link from 'next/link';
import AuthFormLogin from '../_component/auth-form-login';

async function Login() {
  return (
    <div className="mx-auto max-w-[400px] ">
      <div className="bg-white shadow-lg  shadow-indigo-500/40 rounded-sm py-6 px-10">
        <h1 className="mt-1 mb-3 text-base font-extrabold text-gray-500 text-center">
          Đăng nhập vào Trello
        </h1>
        <AuthFormLogin />
        <hr className="h-[1px] w-full bg-gray-400 my-5" />
        <ul className="flex justify-center items-center">
          <li className="text-sm text-sky-500 pr-2">
            <a href="#" className="cursor-pointer">
              Không thể đăng nhập?
            </a>
          </li>
          <li className="text-sm text-sky-500">
            <Link href="/signup" prefetch={false} className="cursor-pointer">
              Đăng ký tài khoản
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
