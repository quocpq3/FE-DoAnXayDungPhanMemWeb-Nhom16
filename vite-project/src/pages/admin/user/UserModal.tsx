import { Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { App } from "antd";

import type {
  IUser,
  IRole,
} from "../../../services/apis/user/user.interface";
import { createUser, updateUser } from "../../../services/apis/user/user.api";
import { EFormType } from "../../../config/enum";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  user?: IUser;
  roles: IRole[];
}

const UserModal = ({
  open,
  onClose,
  onSuccess,
  formType,
  user,
  roles,
}: Props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();
  useEffect(() => {
    if (open) {
      if (formType === EFormType.UPDATE && user) {
        const userRole =
          user.roles && user.roles.length > 0 ? user.roles[0] : undefined;
        const matchingRole = roles.find(
          (r) =>
            r.name === userRole ||
            r.name === userRole?.replace("ROLE_", "") ||
            `ROLE_${r.name}` === userRole
        );

        form.setFieldsValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          roles: matchingRole ? matchingRole.name : userRole,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, user, formType, roles]);


  const onCreate = async (values: any) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        roles: values.roles ? [values.roles] : [],
      };

      await createUser(payload);
      message.success("Thêm user thành công");
      form.resetFields();
      await onSuccess();
      onClose();
    } catch {
      message.error("Thêm user thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (values: any) => {
    if (!user) {
      message.error("Không tìm thấy user");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        ...values,
        roles: values.roles ? [values.roles] : [],
      };

      await updateUser(user.id, payload);
      message.success("Cập nhật user thành công");
      form.resetFields();
      onSuccess();
      onClose();
    } catch {
      message.error("Cập nhật user thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      confirmLoading={isLoading}
      title={formType === EFormType.UPDATE ? "CẬP NHẬT USER" : "THÊM USER"}
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText="Đồng ý"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={formType === EFormType.UPDATE ? onUpdate : onCreate}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="SĐT" name="phone">
          <Input />
        </Form.Item>

        {formType === EFormType.CREATE && (
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="roles"
          rules={[{ required: true, message: "Chọn vai trò" }]}
        >
          <Select
            placeholder="Chọn vai trò"
            options={roles.map((r) => ({
              value: r.name,
              label: r.name.replace("ROLE_", ""),
            }))}
            optionRender={(option) => (
              <div>
                {option.label}
              </div>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
