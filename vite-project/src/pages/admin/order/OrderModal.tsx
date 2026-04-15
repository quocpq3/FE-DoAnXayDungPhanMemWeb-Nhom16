import {
  App,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Table,
  Divider,
  Tag,
} from "antd";
import type { IOrder } from "../../../services/apis/order/order.interface";
import { useEffect, useState } from "react";
import { EFormType } from "../../../config/enum";
import { createOrder } from "../../../services/apis/order/order.api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  order?: IOrder;
}

const OrderModal = ({ open, onClose, onSuccess, formType, order }: Props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    if (formType === EFormType.UPDATE && order) {
      form.setFieldsValue({
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        deliveryMethod: order.deliveryMethod,
        note: order.note,
      });
    } else {
      form.resetFields();
    }
  }, [order, formType, form]);

  const onCreate = async (formData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: string;
    deliveryMethod: string;
    note?: string;
  }) => {
    try {
      setIsLoading(true);
      await createOrder(formData);
      message.success("Tạo đơn hàng thành công");
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Tạo đơn hàng thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const itemColumns = [
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      width: 80,
      render: (url: string) => (
        <img
          src={url}
          alt="item"
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên món",
      dataIndex: "itemName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 80,
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      width: 120,
      render: (p: number) => p.toLocaleString() + " đ",
    },
    {
      title: "Thành tiền",
      dataIndex: "lineTotal",
      width: 120,
      render: (p: number) => <b>{p.toLocaleString()} đ</b>,
    },
  ];

  return (
    <Modal
      confirmLoading={isLoading}
      title={
        formType === EFormType.CREATE ? "TẠO ĐƠN HÀNG" : "CHI TIẾT ĐƠN HÀNG"
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onClose}
      onOk={formType === EFormType.CREATE ? () => form.submit() : onClose}
      width={800}
      okText={formType === EFormType.CREATE ? "Tạo" : "Đóng"}
    >
      {formType === EFormType.CREATE ? (
        <Form form={form} layout="vertical" onFinish={onCreate}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên khách"
                name="customerName"
                rules={[{ required: true, message: "Vui lòng nhập tên khách" }]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SĐT"
                name="customerPhone"
                rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ giao hàng"
                name="deliveryAddress"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input.TextArea rows={2} placeholder="Nhập địa chỉ giao hàng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[
                  { required: true, message: "Vui lòng chọn phương thức" },
                ]}
              >
                <Select placeholder="Chọn phương thức">
                  <Select.Option value="CASH">Tiền mặt</Select.Option>
                  <Select.Option value="CARD">Thẻ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phương thức giao hàng"
                name="deliveryMethod"
                rules={[
                  { required: true, message: "Vui lòng chọn phương thức" },
                ]}
              >
                <Select placeholder="Chọn phương thức">
                  <Select.Option value="DELIVERY">Giao tận nơi</Select.Option>
                  <Select.Option value="PICKUP">Tại quán</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea rows={2} placeholder="Nhập ghi chú" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        order && (
          <>
            <p>
              <b>ID:</b> {order.orderId}
            </p>
            <p>
              <b>Mã đơn:</b> {order.orderCode}
            </p>
            <p>
              <b>User ID:</b> {order.userId || "Khách vãng lai"}
            </p>

            <Divider />

            <p>
              <b>Tên khách:</b> {order.customerName}
            </p>
            <p>
              <b>SĐT:</b> {order.customerPhone}
            </p>
            <p>
              <b>Địa chỉ:</b> {order.deliveryAddress}
            </p>

            <Divider />

            <p>
              <b>Thanh toán:</b> <Tag color="purple">{order.paymentMethod}</Tag>
            </p>

            <p>
              <b>Giao hàng:</b> <Tag color="cyan">{order.deliveryMethod}</Tag>
            </p>

            <p>
              <b>Trạng thái:</b> <Tag color="blue">{order.orderStatus}</Tag>
            </p>

            <Divider />

            <p>
              <b>Ghi chú:</b> {order.note || "Không có"}
            </p>

            <Divider />

            <p>
              <b>Ngày tạo:</b>{" "}
              {new Date(order.createdAt).toLocaleString("vi-VN")}
            </p>

            <Divider />

            <h3>Danh sách món</h3>
            <Table
              columns={itemColumns}
              dataSource={order.items}
              rowKey="orderItemId"
              pagination={false}
            />

            <Divider />

            <h2 style={{ color: "red" }}>
              Tổng tiền: {order.totalAmount.toLocaleString()} đ
            </h2>
          </>
        )
      )}
    </Modal>
  );
};

export default OrderModal;
