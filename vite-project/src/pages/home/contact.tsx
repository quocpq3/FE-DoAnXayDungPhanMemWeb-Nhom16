const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen px-4 py-10 bg-slate-50 text-slate-900 sm:px-6 lg:px-8">
      <div className="max-w-5xl p-8 mx-auto bg-white shadow-xl rounded-3xl shadow-slate-200/60 ring-1 ring-slate-200">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d4f]">
            Liên hệ
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Gửi tin nhắn cho chúng tôi
          </h1>

          <p className="max-w-3xl mx-auto mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Nếu bạn có câu hỏi, góp ý hoặc muốn hỗ trợ, hãy điền thông tin bên
            dưới.
          </p>

          {/* TOP ICON */}
          <div className="grid max-w-xl grid-cols-3 gap-4 mx-auto mt-8 sm:max-w-2xl">
            {/* item */}
            <div className="p-4 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2h-1l-3 3-4-4-4 4-3-3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#ff4d4f]">
                Hỗ trợ
              </p>
            </div>

            <div className="p-4 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#ff4d4f]">
                Email nhanh
              </p>
            </div>

            <div className="p-4 text-center shadow-sm rounded-3xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white shadow-sm rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#ff4d4f]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#ff4d4f]">
                Địa điểm
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* FORM */}
          <form className="p-6 space-y-6 border rounded-3xl border-slate-200 bg-slate-50">
            <div>
              <label className="block text-sm font-medium">Họ và tên</label>
              <input
                type="text"
                className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff4d4f] focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff4d4f] focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Nội dung</label>
              <textarea
                rows={6}
                className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff4d4f] focus:ring-2 focus:ring-red-100"
              />
            </div>

            <button className="w-full rounded-2xl bg-[#ff4d4f] py-3 font-semibold text-white hover:bg-red-600">
              Gửi liên hệ
            </button>
          </form>

          {/* INFO */}
          <aside className="p-6 border rounded-3xl border-slate-200 bg-slate-50">
            <h2 className="text-2xl font-semibold">Thông tin liên hệ</h2>

            <div className="mt-6 space-y-4 text-sm">
              {/* EMAIL */}
              <div className="flex gap-3 p-4 bg-white shadow-sm rounded-3xl">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-2xl">
                  <svg
                    className="h-5 w-5 text-[#ff4d4f]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>support@gmail.com</p>
                </div>
              </div>

              {/* HOTLINE */}
              <div className="flex gap-3 p-4 bg-white shadow-sm rounded-3xl">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-2xl">
                  <svg
                    className="h-5 w-5 text-[#ff4d4f]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 9-9 9-9 9 4.03 9 9Z" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Hotline</p>
                  <p>1900 1234</p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex gap-3 p-4 bg-white shadow-sm rounded-3xl">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-2xl">
                  <svg
                    className="h-5 w-5 text-[#ff4d4f]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Địa chỉ</p>
                  <p>180 Cao Lỗ, Q8, TP.HCM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
