const AboutPage: React.FC = () => {
  return (
    <div className="min-vh-100 about-bg">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold text-dark mb-3 title-shadow">
            Về Chúng Tôi
          </h1>
          <div className="divider"></div>
        </div>

        {/* Hero Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="p-4 bg-white rounded-3 shadow-lg">
              <h2 className="mb-4 text-warning fw-bold">Câu Chuyện Của Chúng Tôi</h2>
              <p className="lead mb-3 text-muted">
                Chào mừng bạn đến với cửa hàng của chúng tôi! Chúng tôi tự hào mang đến những món ăn ngon miệng...
              </p>
              <p className="lead text-muted">
                 Từ những ngày đầu thành lập, chúng tôi đã không ngừng nỗ lực...

Chúng tôi luôn trân trọng từng cơ hội được kết nối và lắng nghe ý kiến từ khách hàng. Đối với chúng tôi, mỗi phản hồi của bạn không chỉ là một thông tin đơn thuần mà còn là động lực để không ngừng hoàn thiện chất lượng dịch vụ và mang đến những trải nghiệm tốt hơn mỗi ngày.

Nếu bạn có bất kỳ thắc mắc nào liên quan đến thực đơn, đặt bàn, tổ chức sự kiện hoặc các dịch vụ khác, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ nhân viên tận tâm và chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn một cách nhanh chóng, chu đáo và hiệu quả nhất.

Bên cạnh đó, chúng tôi cũng rất mong nhận được những ý kiến đóng góp, chia sẻ cảm nhận của bạn sau mỗi lần trải nghiệm. Chính những góp ý chân thành đó sẽ giúp chúng tôi ngày càng hoàn thiện hơn, từ chất lượng món ăn đến phong cách phục vụ.

Hãy để chúng tôi đồng hành cùng bạn trong những bữa ăn đáng nhớ, những khoảnh khắc sum họp và những trải nghiệm ẩm thực tuyệt vời. Chúng tôi cam kết mang đến sự hài lòng và niềm vui trọn vẹn cho bạn mỗi khi ghé thăm.

Xin chân thành cảm ơn và rất mong được phục vụ bạn!
               
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Restaurant"
                className="img-fluid rounded-3 shadow-lg img-rotate"
              />
              <div className="position-absolute top-0 start-0 bg-warning text-white px-3 py-2 rounded-pill shadow">
                ⭐ 5.0 Rating
              </div>
            </div>
          </div>
        </div>

        {/* Cards giữ nguyên */}
      </div>
    </div>
  );
};

export default AboutPage;