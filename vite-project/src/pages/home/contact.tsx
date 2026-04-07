const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Liên hệ</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Gửi tin nhắn cho chúng tôi
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Nếu bạn có câu hỏi, góp ý hoặc muốn hỗ trợ, hãy điền thông tin bên dưới. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-4 sm:max-w-2xl">
            <div className="rounded-3xl bg-cyan-50 p-4 text-center text-cyan-700 shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2h-1l-3 3-4-4-4 4-3-3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em]">Hỗ trợ</p>
            </div>
            <div className="rounded-3xl bg-cyan-50 p-4 text-center text-cyan-700 shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em]">Email nhanh</p>
            </div>
            <div className="rounded-3xl bg-cyan-50 p-4 text-center text-cyan-700 shadow-sm ring-1 ring-cyan-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em]">Địa điểm</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" placeholder="support@gmail.com" className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Nội dung</label>
              <textarea rows={6} placeholder="Nhập nội dung..." className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
            </div>

            <button type="button" className="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50">
              <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              </svg>
              Gửi liên hệ
            </button>
          </form>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
            <h2 className="text-2xl font-semibold text-slate-900">Thông tin liên hệ</h2>
            <p className="mt-4 text-slate-600">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy sử dụng thông tin sau đây nếu bạn cần liên hệ trực tiếp.
            </p>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p>support@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 9-9 9-9 9 4.03 9 9Z" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Hotline</p>
                  <p>1900 1234</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Địa chỉ</p>
                  <p>180 Cao Lỗ, P4, Q8, TP. HCM</p>
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
