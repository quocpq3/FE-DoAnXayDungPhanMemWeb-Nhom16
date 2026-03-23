import { Button, Checkbox, Flex, Form, Input, Modal, Typography } from "antd";
import type { ModalProps } from "antd";
const styles: ModalProps["styles"] = {};

interface ModalLoginProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const { Title } = Typography;
const ModalLogin: React.FC<ModalLoginProps> = ({ open, setOpen }) => {
  const onFinish = (values: ModalLoginProps) => {
    console.log("submit", values);
    // TODO: Add login logic here
    //api login
  };

  return (
    <>
      <Modal
        centered
        width={500}
        footer={null}
        title={
          <div className="py-4">
            <Title level={3} style={{ margin: 0 }}>
              Đăng nhập
            </Title>
          </div>
        }
        styles={styles}
        open={open}
        onCancel={() => setOpen(false)}
        bodyStyle={{ borderRadius: 16, padding: "24px 24px 16px" }}
      >
        <Form
          layout="vertical"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              <span className="text-red-600 font-semibold cursor-pointer underline">
                Quên mật khẩu?
              </span>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item>
            <Flex justify="center" gap={6}>
              <span>Bạn chưa có tài khoản?</span>
              <span className="text-red-600 font-semibold cursor-pointer underline">
                Đăng ký
              </span>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalLogin;
