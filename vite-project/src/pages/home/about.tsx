const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen px-4 py-10 bg-slate-50 text-slate-900 sm:px-6 lg:px-8">
      <div className="max-w-6xl p-8 mx-auto bg-white shadow-xl rounded-3xl shadow-slate-200/60 ring-1 ring-slate-200">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d4f]">
            Giới thiệu
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Chúng tôi tạo trải nghiệm ẩm thực đáng nhớ
          </h1>

          <p className="max-w-3xl mx-auto mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Hệ thống đặt món trực tuyến của chúng tôi giúp khách hàng dễ dàng
            tìm kiếm, lựa chọn và thưởng thức món ngon ngay tại nhà.
          </p>

          <p className="max-w-3xl mx-auto mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Chúng tôi tập trung vào trải nghiệm nhanh, thân thiện và minh bạch.
          </p>

          {/* FEATURES */}
          <div className="grid max-w-4xl grid-cols-3 gap-5 mx-auto mt-10">
            {/* ITEM 1 */}
            <div className="p-6 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 8h18" />
                  <path d="M7 8v13" />
                  <path d="M17 8v13" />
                  <path d="M3 8l4-4h10l4 4" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold">Đặt nhanh</p>
              <p className="mt-2 text-sm text-slate-600">
                Thanh toán chỉ với vài bước đơn giản.
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="p-6 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 15c0-4 4-7 8-7s8 3 8 7" />
                  <path d="M6 20h12" />
                  <path d="M12 7v5" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold">Phục vụ tận tâm</p>
              <p className="mt-2 text-sm text-slate-600">
                Luôn lắng nghe và phản hồi nhanh chóng.
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="p-6 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold">Minh bạch</p>
              <p className="mt-2 text-sm text-slate-600">
                Giá cả rõ ràng, không phí ẩn.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-3">
          <section className="p-6 border rounded-3xl border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold">Tầm nhìn</h2>
            <p className="mt-3 text-slate-600">
              Xây dựng nền tảng đặt đồ ăn trực tuyến thân thiện, nhanh chóng và
              tin cậy.
            </p>
          </section>

          <section className="p-6 border rounded-3xl border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold">Sứ mệnh</h2>
            <p className="mt-3 text-slate-600">
              Kết nối khách hàng với nhà hàng chất lượng và nâng cao trải
              nghiệm.
            </p>
          </section>

          <section className="p-6 border rounded-3xl border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold">Giá trị cốt lõi</h2>
            <ul className="mt-3 space-y-3 text-slate-600">
              <li>• Tốc độ & tiện lợi</li>
              <li>• Minh bạch & chất lượng</li>
              <li>• Hỗ trợ khách hàng thân thiện</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
