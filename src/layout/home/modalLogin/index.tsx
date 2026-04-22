import React from "react";
import { Button, Checkbox, Flex, Form, Input, Modal, Typography, message } from "antd";
import { login, register } from "../../../services/apis/user/user.api";
import { getCurrentRoles } from "../../../helper/auth";

interface ModalLoginProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUser?: (user: { email?: string; name?: string; roles?: string[] }) => void;
}

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const { Title } = Typography;

const ModalLogin: React.FC<ModalLoginProps> = ({ open, setOpen, setUser }) => {
  const [formLogin] = Form.useForm<LoginFormValues>();
  const [formRegister] = Form.useForm<RegisterFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isRegister, setIsRegister] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onFinishLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response: any = await login({
        email: values.email,
        password: values.password,
      });

      // lấy data an toàn (tránh lỗi TS)
      const data = response?.result ?? response;

      if (!data || data.authenticated === false) {
        messageApi.error("Sai email hoặc mật khẩu!");
        return;
      }

      localStorage.setItem("token", data?.token ?? "");
      const resolvedRoles = data?.user?.roles ?? getCurrentRoles();
      const user = {
        name: data?.user?.name ?? values.email,
        email: data?.user?.email ?? values.email,
        roles: resolvedRoles.length > 0 ? resolvedRoles : ["ROLE_USER"],
      };

      setUser?.(user);
      localStorage.setItem("user", JSON.stringify(user));

      messageApi.success(`Xin chào ${user.name}! Bạn đã đăng nhập thành công.`);
      setOpen(false);
    } catch (error: any) {
      const msg = error?.message || "Sai email hoặc mật khẩu";
      messageApi.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      messageApi.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsRegister(false);
      formRegister.resetFields();
    } catch (error: any) {
      const msg = error?.message || "Đăng ký thất bại";
      messageApi.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    messageApi.warning("Vui lòng kiểm tra lại thông tin đã nhập.");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    formLogin.resetFields();
    formRegister.resetFields();
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
              {isRegister ? "Đăng ký" : "Đăng nhập"}
            </Title>
          </div>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
          setIsRegister(false);
        }}
        styles={{ body: { borderRadius: 16, padding: "24px 24px 16px" } }}
      >
        {!isRegister ? (
          <Form
            form={formLogin}
            layout="vertical"
            size="large"
            autoComplete="off"
            onFinish={onFinishLogin}
            onFinishFailed={onFinishFailed}
          >
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
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item>
            <Flex justify="center" gap={6}>
              <span>Bạn chưa có tài khoản?</span>
              <span
                className="text-red-600 font-semibold cursor-pointer underline"
                onClick={toggleMode}
              >
                Đăng ký
              </span>
            </Flex>
          </Form.Item>
          </Form>
        ) : (
          <Form
            form={formRegister}
            layout="vertical"
            size="large"
            autoComplete="off"
            onFinish={onFinishRegister}
            onFinishFailed={onFinishFailed}
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

          <Form.Item>
            <Flex justify="center" gap={6}>
              <span>Bạn đã có tài khoản?</span>
              <span
                className="text-red-600 font-semibold cursor-pointer underline"
                onClick={toggleMode}
              >
                Đăng nhập
              </span>
            </Flex>
          </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ModalLogin;