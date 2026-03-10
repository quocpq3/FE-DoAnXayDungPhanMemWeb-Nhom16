import { Form, Input, message, Modal } from "antd";
import type { IUserCreate } from "../../../services/apis/user/user.interface";
import { createUser } from "../../../services/apis/user/user.api";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UserModalForm = ({ open, onClose, onSuccess }: IProps) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: IUserCreate) => {
    try {
      await createUser(values);
      message.success("Thêm người dùng thành công");
      console.log(values);
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Thêm người dùng thất bại");
    }
  };
  return (
    <Modal
      title="Thêm người dùng"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
