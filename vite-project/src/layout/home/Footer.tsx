import { Layout, Input, Button, Row, Col, Flex } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Logo from "../../components/logo/Logo";

const { Footer } = Layout;

const FooterLayout: React.FC = () => {
  return (
    <Footer style={{ background: "#f5f7fa", padding: "40px 80px" }}>
      <div className="max-w-[1200px] mx-auto px-4 mt-5">
        <Row gutter={[40, 20]}>
          <Col xs={24} md={6}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
              <Logo />
            </div>
            <p style={{ color: "#8c8c8c" }}>
              Mang đến những bữa ăn ngon miệng và trải nghiệm giao hàng tuyệt
              vời nhất cho bạn mỗi ngày.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <h4 className="py-3 font-semibold">Liên kết</h4>
            <Flex vertical gap={6} style={{ color: "#8c8c8c" }}>
              <span>Trang chủ</span>
              <span>Thực đơn</span>
              <span>Về chúng tôi</span>
              <span>Khuyến mãi</span>
            </Flex>
          </Col>
          <Col xs={12} md={6}>
            <h4 className="py-3 font-semibold">Hỗ trợ</h4>
            <Flex vertical gap={6} style={{ color: "#8c8c8c" }}>
              <span>Trung tâm trợ giúp</span>
              <span>Chính sách bảo mật</span>
              <span>Điều khoản dịch vụ</span>
            </Flex>
          </Col>
          <Col xs={24} md={6}>
            <h4 className="py-3 font-semibold">Bản tin</h4>
            <p className="text-[#8c8c8c] pb-3">
              Nhận thông báo về các ưu đãi mới nhất.
            </p>

            <Flex>
              <Input
                placeholder="Email của bạn"
                style={{
                  borderRadius: "20px 0 0 20px",
                  height: 40,
                }}
              />
              <Button
                type="primary"
                danger
                icon={<SendOutlined />}
                style={{
                  borderRadius: "0 20px 20px 0",
                  height: 40,
                }}
              />
            </Flex>
          </Col>
        </Row>
        <div
          style={{
            borderTop: "1px solid #eee",
            marginTop: 30,
            paddingTop: 20,
            textAlign: "center",
            color: "#aaa",
          }}
        >
          © 2026 Foody. All rights reserved.
        </div>
      </div>
    </Footer>
  );
};

export default FooterLayout;
