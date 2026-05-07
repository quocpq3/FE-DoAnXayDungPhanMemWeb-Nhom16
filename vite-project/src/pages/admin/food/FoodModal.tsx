import {
  App,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Row,
  Col,
} from "antd";
import type {
  IFood,
  IFoodCreate,
} from "../../../services/apis/food/food.interface";
import { useEffect, useState } from "react";
import { EFormType } from "../../../config/enum";
import { createFood, updateFood } from "../../../services/apis/food/food.api";
import type { ICategory } from "../../../services/apis/categories/categories.interface";
import { getCategory } from "../../../services/apis/categories/categories.api";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  food?: IFood;
}

const FoodModal = ({ open, onClose, onSuccess, formType, food }: IProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { message } = App.useApp();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        setCategories(res);
      } catch {
        message.error("Không tải được danh mục");
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  useEffect(() => {
    if (formType === EFormType.UPDATE && food) {
      form.setFieldsValue({
        itemName: food.itemName,
        slug: food.slug,
        description: food.description,
        imageUrl: food.imageUrl,
        basePrice: food.basePrice,
        discountPercent: food.discountPercent,
        categoryId: food.categoryId,
        isAvailable: food.isAvailable,
        isCombo: food.isCombo,
      });
    } else {
      form.resetFields();
    }
  }, [food, formType, form]);

  const onCreate = async (formData: IFoodCreate) => {
    try {
      setIsLoading(true);

      await createFood(formData);

      message.success("Thêm món ăn thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Thêm món ăn thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (formData: IFoodCreate) => {
    if (!food) {
      message.error("Không tìm thấy món ăn");
      return;
    }

    try {
      setIsLoading(true);

      await updateFood(food.itemId, formData);

      message.success("Cập nhật món ăn thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Cập nhật món ăn thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        confirmLoading={isLoading}
        title={
          formType === EFormType.CREATE
            ? "THÊM MÓN ĂN"
            : "CẬP NHẬT THÔNG TIN MÓN ĂN"
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onCancel={onClose}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={formType === EFormType.CREATE ? onCreate : onUpdate}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên món"
                name="itemName"
                rules={[{ required: true, message: "Vui lòng nhập tên món" }]}
              >
                <Input placeholder="Nhập tên món ăn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: "Vui lòng nhập slug" }]}
              >
                <Input placeholder="vi-du-ga-ran" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((c) => (
                    <Select.Option key={c.categoryId} value={c.categoryId}>
                      {c.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Giá gốc"
                name="basePrice"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Nhập giá gốc"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Item
                label="Giảm giá (%)"
                name="discountPercent"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  placeholder="0 - 100"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ảnh"
                name="imageUrl"
                rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}
              >
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả món ăn" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Trạng thái"
                name="isAvailable"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Đang bán"
                  unCheckedChildren="Ngừng bán"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Loại món"
                name="isCombo"
                valuePropName="checked"
              >
                <Switch checkedChildren="Combo" unCheckedChildren="Món lẻ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default FoodModal;
