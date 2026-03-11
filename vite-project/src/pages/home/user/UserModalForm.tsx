import { Form, Input, message, Modal } from "antd";
import type {
  IUser,
  IUserCreate,
} from "../../../services/apis/user/user.interface";
import { createUser, updateUser } from "../../../services/apis/user/user.api";
import { EFormType } from "../../../config/enum";
import { useEffect, useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  user?: IUser;
}

const UserModalForm = ({
  open,
  onClose,
  onSuccess,
  formType,
  user,
}: IProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (formType === EFormType.UPDATE && user) {
      form.setFieldsValue({
        name: user.name,
      });
    } else {
      form.resetFields();
    }
  }, [user, formType, form]);
  const onCreate = async (formData: IUserCreate) => {
    try {
      setIsLoading(true);
      await createUser(formData);
      message.success("Thêm người dùng thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Thêm người dùng thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async (formData: IUserCreate) => {
    if (!user) {
      message.error("Không tìm thấy người dùng");
      return;
    }
    try {
      setIsLoading(true);

      await updateUser(user.id, formData);

      message.success("Cập nhật người dùng thành công");

      form.resetFields();
      onSuccess();
    } catch {
      message.error("Cập nhật người dùng thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      loading={isLoading}
      title={
        formType === EFormType.CREATE
          ? "THÊM NGƯỜI DÙNG MỚI"
          : "CẬP NHẬT THÔNG TIN NGƯỜI DÙNG"
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={formType === EFormType.CREATE ? onCreate : onUpdate}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
        >
          <Input type="text" placeholder="Nhập tên người dùng" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModalForm;
