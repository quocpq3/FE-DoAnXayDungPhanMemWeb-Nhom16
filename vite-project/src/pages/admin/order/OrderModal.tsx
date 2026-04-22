import { Modal, Row, Col, Table, Divider, Tag } from "antd";
import type {
  IOrder,
  IOrderItem,
} from "../../../services/apis/order/order.interface";
import type { ColumnsType } from "antd/es/table";

interface Props {
  open: boolean;
  onClose: () => void;
  order?: IOrder;
}

const OrderModal = ({ open, onClose, order }: Props) => {
  if (!order) return null;

  const statusMap: Record<string, { color: string; text: string }> = {
    PENDING: { color: "orange", text: "Chờ xử lý" },
    PAID: { color: "green", text: "Đã thanh toán" },
    COMPLETED: { color: "blue", text: "Hoàn thành" },
    CANCELLED: { color: "red", text: "Đã hủy" },
  };

  const itemColumns: ColumnsType<IOrderItem> = [
    { title: "Tên món", dataIndex: "itemName" },
    { title: "SL", dataIndex: "quantity", align: "center" },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      align: "right",
      render: (v: number) => v.toLocaleString() + " đ",
    },
    {
      title: "Thành tiền",
      dataIndex: "lineTotal",
      align: "right",
      render: (v: number) => (
        <b style={{ color: "#1677ff" }}>{v.toLocaleString()} đ</b>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      title="CHI TIẾT ĐƠN HÀNG"
    >
      {/* 🔥 Thông tin dạng bảng */}
      <div style={{ background: "#fafafa", padding: 16, borderRadius: 8 }}>
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <b>Mã đơn:</b> {order.orderCode}
          </Col>
          <Col span={12}>
            <b>Ngày tạo:</b> {new Date(order.createdAt).toLocaleString("vi-VN")}
          </Col>

          <Col span={12}>
            <b>Khách hàng:</b> {order.customerName}
          </Col>
          <Col span={12}>
            <b>SĐT:</b> {order.customerPhone}
          </Col>

          <Col span={24}>
            <b>Địa chỉ:</b> {order.deliveryAddress}
          </Col>

          <Col span={12}>
            <b>Thanh toán:</b>{" "}
            {order.paymentMethod === "CASH" ? "Tiền mặt" : "Chuyển khoản"}
          </Col>

          <Col span={12}>
            <b>Giao hàng:</b>{" "}
            {order.deliveryMethod === "DELIVERY" ? "Giao tận nơi" : "Tại quán"}
          </Col>

          <Col span={12}>
            <b>Trạng thái:</b>{" "}
            <Tag color={statusMap[order.orderStatus].color}>
              {statusMap[order.orderStatus].text}
            </Tag>
          </Col>

          <Col span={24}>
            <b>Ghi chú:</b> {order.note || "—"}
          </Col>
        </Row>
      </div>

      <Divider>Danh sách món</Divider>

      {/* 🔥 Table món */}
      <Table
        dataSource={order.items}
        columns={itemColumns}
        rowKey="orderItemId"
        pagination={false}
      />

      <Divider />

      {/* 🔥 Tổng tiền */}
      <Row justify="end">
        <h2 style={{ color: "#ff4d4f" }}>
          Tổng: {order.totalAmount.toLocaleString()} đ
        </h2>
      </Row>
    </Modal>
  );
};

export default OrderModal;
