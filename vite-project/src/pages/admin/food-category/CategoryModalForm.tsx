import { Form, Input, Modal } from "antd";
import type {
  ICategory,
  ICategoryCreate,
} from "../../../services/apis/categories/categories.interface";
import { EFormType } from "../../../config/enum";
import { useEffect, useState } from "react";
import {
  createCategory,
  updateCategory,
} from "../../../services/apis/categories/categories.api";
import { App } from "antd";
interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  category?: ICategory;
}

const CategotyModalForm = ({
  open,
  onClose,
  onSuccess,
  formType,
  category,
}: IProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { message } = App.useApp();

  useEffect(() => {
    if (formType === EFormType.UPDATE && category) {
      form.setFieldsValue({
        categoryName: category.categoryName,
        description: category.description,
      });
    } else {
      form.resetFields();
    }
  }, [category, formType, form]);
  const onCreate = async (FormData: ICategoryCreate) => {
    try {
      setIsLoading(true);
      await createCategory(FormData);
      message.success("Thêm loại món thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Thêm loại món thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async (formData: ICategoryCreate) => {
    if (!category) {
      message.error("Không tìm thấy loại món");
      return;
    }
    try {
      setIsLoading(true);
      await updateCategory(category.categoryId, formData);
      message.success("Cập nhập loại món thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Cập nhật loại món thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      confirmLoading={isLoading}
      title={
        formType === EFormType.CREATE
          ? "THÊM LOẠI MÓN ĂN"
          : "CẬP NHẬT THÔNG TIN LOẠI MÓN ĂN"
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
          label="Tên loại món"
          name="categoryName"
          rules={[{ required: true, message: "Vui lòng nhập tên loại món" }]}
        >
          <Input placeholder="Nhập tên loại món" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả danh mục" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategotyModalForm;
