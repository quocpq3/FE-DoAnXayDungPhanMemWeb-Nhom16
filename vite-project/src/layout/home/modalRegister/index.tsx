import React from "react";
import { Button, Form, Input, Modal, Typography, message } from "antd";
import { register } from "../../../services/apis/user/user.api";

interface ModalRegisterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const { Title } = Typography;

const ModalRegister: React.FC<ModalRegisterProps> = ({
  open,
  setOpen,
  onSwitchToLogin,
}) => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      messageApi.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setOpen(false);
      form.resetFields();
      onSwitchToLogin?.();
    } catch (error: any) {
      const msg = error?.message || "Đăng ký thất bại";
      messageApi.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        width={500}
        footer={null}
        title={
          <div className="py-4">
            <Title level={3} style={{ margin: 0 }}>
              Đăng ký
            </Title>
          </div>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        styles={{ body: { borderRadius: 16, padding: "24px 24px 16px" } }}
      >
        <Form
          form={form}
          layout="vertical"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalRegister;