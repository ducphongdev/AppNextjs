function Home() {
  return (
    <>
      <section className="w-full">
        <div className="w-[960px] mx-auto pt-28 pb-20 px-4 text-center text-md-left">
          <div className="items-center grid grid-cols-3">
            <div className="col-span-2 mr-20 text-left">
              <h1 className="text-5xl leading-tight text-black font-semibold mb-1">
                Trello giúp các nhóm phát triển công việc về phía trước.
              </h1>
              <p className="text-black text-lg mb-2">
                Cộng tác, quản lý dự án và đạt đến đỉnh cao năng suất mới. Từ các tòa nhà cao tầng
                đến văn phòng tại nhà, cách nhóm của bạn làm việc là duy nhất—hoàn thành tất cả với
                Trello.
              </p>
              <form action="" className="flex my-7">
                <div className="pr-2 flex-1">
                  <input
                    type="text"
                    className="w-full p-2 text-[#495057] bg-white rounded-md border-[1px] border-solid border-[#ced4da] focus:border-indigo-[#80b2ff]"
                  />
                </div>
                <div className="pl-2">
                  <button className="bg-sky-800 px-6 py-[6px] text-center text-lg text-white font-semibold rounded-md">
                    Đăng ký miễn phí
                  </button>
                </div>
              </form>
            </div>

            <div className="col-span-1 p-1">
              <img
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
                alt=""
                width="931"
                height="1205"
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[960px] mx-auto py-8 px-1">
          <div className="text-center ml-20 px-4 ">
            <h2 className="font-semibold text-4xl mb-2">
              Đó không chỉ là công việc. Đó là cách làm việc cùng nhau.
            </h2>
            <p className="text-xl mb-4">
              Bắt đầu với bảng Trello, danh sách và thẻ. Tùy chỉnh và mở rộng với nhiều tính năng
              hơn khi tinh thần làm việc nhóm của bạn phát triển. Quản lý các dự án, sắp xếp nhiệm
              vụ và xây dựng tinh thần làm việc nhóm—tất cả ở cùng một nơi.
            </p>
            <p className="mb-5">
              <a
                href=""
                className="px-3 py-2 text-indigo-800 text-lg border-[1px] border-solid border-indigo-500 rounded-md"
              >
                Bắt đầu làm việc →
              </a>
            </p>
          </div>

          <div>
            <div className="px-1 mb-2">
              <img
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png"
                alt=""
                width="1902"
                height="1334"
              />
            </div>
          </div>

          <div className="text-center">
            <div className="mx-2">
              <p className="text-lg">
                Tham gia cùng hơn 1.000.000 nhóm trên toàn thế giới đang sử dụng Trello để hoàn
                thành nhiều việc hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[960px] mx-auto pt-28 pb-20 px-4 text-center text-md-left">
          <div className="grid grid-cols-2">
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Các tính năng giúp nhóm của bạn thành công
              </h2>
              <p className="text-lg">
                Tăng cường hiệu quả làm việc của nhóm có nghĩa là sử dụng một công cụ mạnh (và nhiều
                đồ ăn nhẹ). Từ các cuộc họp và dự án cho đến các sự kiện và thiết lập mục tiêu, các
                tính năng trực quan của Trello giúp các nhóm nhanh chóng thiết lập và tùy chỉnh các
                quy trình làm việc cho bất kỳ việc gì.
              </p>
            </div>
          </div>

          <div className="py-20 grid grid-cols-2">
            <div>
              <img
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/5f90e4a913ac52092f2ac7ff308c45c4/view.svg"
                alt=""
                width="414"
                height="312"
              />
            </div>
            <div className="text-left">
              <h5 className="text-lg uppercase font-semibold">Chọn trình xem</h5>
              <h2 className="text-3xl capitalize font-semibold my-2">Bảng mới chỉ là khởi đầu</h2>
              <p className="text-lg text-slate-600 mb-3">
                Danh sách và thẻ là các khối xây dựng để tổ chức công việc trên bảng Trello. Phát
                triển từ đó với các nhiệm vụ được giao, lịch trình, chỉ số năng suất, lịch và hơn
                thế nữa.
              </p>
              <div>
                <h3 className="text-xl font-semibold">Tìm hiểu thêm</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section slide */}
    </>
  );
}

export default Home;
