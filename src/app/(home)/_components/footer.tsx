function Footer() {
  return (
    <footer>
      <div className="m-20">
        <div className="mb-2 text-center">
          <select
            className="py-2 px-12 text-left border-[1px] border-zinc-400 border-solid rounded-sm text appearance-none"
            name=""
            id=""
          >
            <option value="0">Tiếng việt</option>
          </select>
        </div>

        <ul className="inline-block mb-2 w-full text-center">
          <li className="inline-block p-2">Mẫu</li>
          <li className="inline-block p-2">Biểu phí</li>
          <li className="inline-block p-2">Ứng dụng</li>
          <li className="inline-block p-2">Nghề nghiệp</li>
          <li className="inline-block p-2">Blog</li>
          <li className="inline-block p-2">Nhà phát triển</li>
          <li className="inline-block p-2">Về chúng tôi</li>
          <li className="inline-block p-2">Trợ giúp</li>
          <li className="inline-block p-2">Pháp lý</li>
          <li className="inline-block p-2">Chính sách bảo mật</li>
        </ul>

        <p className="text-center">
          <img
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/6cdbcb3dcf82bba860f1768d184161ee/atlassian-logo-gray-small.svg"
            width="150"
            alt=""
            className="mx-auto mb-2"
          />
          © Bản quyền 2024. Bảo lưu toàn quyền.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
