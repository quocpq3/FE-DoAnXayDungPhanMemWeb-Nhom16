import {
  Button,
  Checkbox,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import type { ModalProps } from "antd";
const styles: ModalProps["styles"] = {};

interface ModalLoginProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const { Title } = Typography;
const ModalLogin: React.FC<ModalLoginProps> = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        width={450}
        footer={null}
        title={
          <div className="py-4">
            <Title level={3}>Đăng nhập</Title>
          </div>
        }
        styles={styles}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff4d4f",
            },
          }}
        >
          <Form size="large">
            <Form.Item
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <span className="text-red-600 font-semibold cursor-pointer underline">
                  Forgot your password?
                </span>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" block>
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex justify="center" gap={6}>
                <span>Chưa có tài khoản?</span>
                <span className="text-red-600 font-semibold cursor-pointer underline">
                  Đăng ký
                </span>
              </Flex>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};

export default ModalLogin;
