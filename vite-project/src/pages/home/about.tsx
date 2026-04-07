const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
        <div className="mb-10 text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Giới thiệu</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Chúng tôi tạo trải nghiệm ẩm thực đáng nhớ
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Hệ thống đặt món trực tuyến của chúng tôi giúp khách hàng dễ dàng tìm kiếm, lựa chọn và thưởng thức món ngon ngay tại nhà.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Chúng tôi tập trung vào trải nghiệm nhanh, thân thiện và minh bạch: từ bộ lọc món ăn, hình ảnh trực quan, đến đánh giá thực tế của khách hàng. Dù bạn muốn đặt bữa trưa, tối gia đình hay quà tặng cho bạn bè, nền tảng luôn đồng hành cùng bạn.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-5 sm:grid-cols-3">
            <div className="rounded-3xl bg-cyan-50 p-6 text-center shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h18" />
                  <path d="M7 8v13" />
                  <path d="M17 8v13" />
                  <path d="M3 8l4-4h10l4 4" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">Đặt nhanh</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Thanh toán chỉ với vài bước đơn giản.</p>
            </div>
            <div className="rounded-3xl bg-cyan-50 p-6 text-center shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15c0-4 4-7 8-7s8 3 8 7" />
                  <path d="M6 20h12" />
                  <path d="M12 7v5" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">Phục vụ tận tâm</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Luôn lắng nghe và phản hồi nhanh chóng.</p>
            </div>
            <div className="rounded-3xl bg-cyan-50 p-6 text-center shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">Minh bạch</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Giá cả rõ ràng, không phí ẩn.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Tầm nhìn</h2>
            <p className="mt-3 text-slate-600">
              Xây dựng nền tảng đặt đồ ăn trực tuyến thân thiện, nhanh chóng và tin cậy cho mọi gia đình.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Sứ mệnh</h2>
            <p className="mt-3 text-slate-600">
              Kết nối khách hàng với nhà hàng chất lượng, giúp quản lý đơn hàng hiệu quả và nâng cao trải nghiệm phục vụ.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Giá trị cốt lõi</h2>
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
