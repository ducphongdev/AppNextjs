import Link from 'next/link';
import Another from '../_component/Another';

function SignUp() {
  return (
    <div className="mx-auto max-w-[400px] ">
      <div className="bg-white shadow-lg  shadow-indigo-500/40 rounded-sm py-6 px-10">
        <h1 className="mt-1 mb-3 text-base font-extrabold text-gray-500 text-center">
          Đăng ký Trello
        </h1>
        <div className="">
          <form action="">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nhập email"
                className="border-[1px] w-full px-2 py-2"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="border-[1px] w-full px-2 py-2"
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
          <li className="text-sm text-sky-500 pr-2">Không thể đăng nhập?</li>
          <li className="text-sm text-sky-500">
            <Link href={'/login'}>Đăng nhập tài khoản</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
