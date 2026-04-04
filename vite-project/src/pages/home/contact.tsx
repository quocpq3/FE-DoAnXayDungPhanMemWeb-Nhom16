const ContactPage: React.FC = () => {
  return (
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" }}
    >
      <div className="container py-5">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold text-dark mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
          >
            Liên Hệ Với Chúng Tôi
          </h1>
          <div
            className="mx-auto"
            style={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
            }}
          ></div>
        </div>

        {/* CONTENT */}
        <div className="row g-4 justify-content-center">

          {/* INFO */}
          <div className="col-md-6 col-lg-5">
            <div
              className="card border-0 shadow-lg h-100 p-4"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
              }}
            >
              <h5 className="fw-bold mb-4 text-center">Thông Tin Liên Hệ</h5>

              <p className="mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                180 Cao Lỗ ,Phường 04, Quận 8, TP.HCM
              </p>

              <p className="mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                (028) 1234-5678
              </p>

              <p className="mb-3">
                <i className="bi bi-envelope-fill me-2"></i>
                Foody@gmail.com
              </p>

              <p>
                <i className="bi bi-clock-fill me-2"></i>
                9:00 - 22:00 hàng ngày
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg h-100 p-4 bg-white">
              <h5 className="fw-bold text-info mb-4 text-center">
                Gửi Tin Nhắn
              </h5>

              <form>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Họ và tên"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Tin nhắn"
                    required
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100 fw-bold">
                  <i className="bi bi-send me-2"></i>Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;