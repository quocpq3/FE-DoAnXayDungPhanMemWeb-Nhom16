import {
  App,
  Button,
  Card,
  Divider,
  List,
  Tag,
  Typography,
  Flex,
  QRCode,
  Avatar,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../../services/apis/order/order.api";
import type { IOrder } from "../../../services/apis/order/order.interface";
import {
  CheckCircleOutlined,
  ShoppingOutlined,
  WalletOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PaymentPage = () => {
  const { id } = useParams();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const [order, setOrder] = useState<IOrder>();
  const [confirmed, setConfirmed] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getOrderById(Number(id))
      .then(setOrder)
      .catch(() => message.error("Không tìm thấy đơn hàng"));
  }, [id]);

  if (!order) return null;

  const isCash = order.paymentMethod === "CASH";

  const handleConfirm = async () => {
    try {
      setConfirmLoading(true);

      await new Promise((res) => setTimeout(res, 800));
      setConfirmed(true);

      message.success(
        isCash
          ? "Bạn sẽ thanh toán khi nhận hàng"
          : "Đã ghi nhận chuyển khoản. Nhân viên sẽ kiểm tra và liên hệ bạn",
      );

      navigate("/");
    } catch {
      message.error("Có lỗi xảy ra");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "48px auto", padding: "0 16px 80px" }}>
      <Flex vertical align="center" gap={6} style={{ marginBottom: 32 }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          Thanh toán
        </Title>
        <Text type="secondary">Mã đơn: {order.orderCode}</Text>
        <Tag
          color={isCash ? "orange" : "green"}
          icon={isCash ? <WalletOutlined /> : <BankOutlined />}
          style={{ borderRadius: 20, padding: "2px 12px", marginTop: 4 }}
        >
          {isCash ? "Tiền mặt khi nhận hàng" : "Chuyển khoản ngân hàng"}
        </Tag>
      </Flex>
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          border: "1px solid #f0f0f0",
          marginBottom: 16,
        }}
        bodyStyle={{ padding: 20 }}
      >
        <Text strong style={{ display: "block", marginBottom: 12 }}>
          Thông tin khách hàng
        </Text>
        <Flex vertical gap={6}>
          <Flex justify="space-between">
            <Text type="secondary">Họ tên</Text>
            <Text strong>{order.customerName}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text type="secondary">Số điện thoại</Text>
            <Text>{order.customerPhone}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text type="secondary">Địa chỉ</Text>
            <Text style={{ maxWidth: 280, textAlign: "right" }}>
              {order.deliveryAddress}
            </Text>
          </Flex>
          {order.note && (
            <Flex justify="space-between">
              <Text type="secondary">Ghi chú</Text>
              <Text>{order.note}</Text>
            </Flex>
          )}
        </Flex>
      </Card>
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          border: "1px solid #f0f0f0",
          marginBottom: 16,
        }}
        bodyStyle={{ padding: 20 }}
      >
        <Flex align="center" gap={8} style={{ marginBottom: 12 }}>
          <ShoppingOutlined style={{ color: "#ff4d4f" }} />
          <Text strong>Đơn hàng</Text>
        </Flex>

        <List
          dataSource={order.items}
          renderItem={(item) => (
            <List.Item
              style={{ padding: "10px 0", borderBottom: "1px dashed #f0f0f0" }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.imageUrl}
                    shape="square"
                    size={44}
                    icon={<ShoppingOutlined />}
                    style={{ borderRadius: 8, background: "#f5f5f5" }}
                  />
                }
                title={<Text style={{ fontSize: 13 }}>{item.itemName}</Text>}
                description={
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    x{item.quantity} · {item.unitPrice.toLocaleString()} đ
                  </Text>
                }
              />
              <Text strong style={{ color: "#ff4d4f" }}>
                {item.lineTotal.toLocaleString()} đ
              </Text>
            </List.Item>
          )}
        />
        <Divider style={{ margin: "12px 0" }} />

        <Flex justify="space-between" align="center">
          <Text strong>Tổng cộng</Text>
          <Text strong style={{ color: "#ff4d4f", fontSize: 18 }}>
            {order.totalAmount.toLocaleString()} đ
          </Text>
        </Flex>
      </Card>
      <Card
        bordered={false}
        style={{ borderRadius: 12, border: "1px solid #f0f0f0" }}
        bodyStyle={{ padding: 20 }}
      >
        {isCash ? (
          <Flex
            vertical
            gap={16}
            align="center"
            style={{ textAlign: "center" }}
          >
            <WalletOutlined style={{ fontSize: 36, color: "#faad14" }} />
            <Flex vertical gap={4} align="center">
              <Text strong>Thanh toán khi nhận hàng</Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Vui lòng chuẩn bị đúng số tiền khi shipper giao hàng
              </Text>
            </Flex>
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={handleConfirm}
              disabled={confirmed}
              style={{
                borderRadius: 8,
                minWidth: 180,
                background: confirmed ? "#52c41a" : undefined,
                borderColor: confirmed ? "#52c41a" : undefined,
              }}
            >
              {confirmed ? "Đã xác nhận ✓" : "Tôi đã hiểu"}
            </Button>
          </Flex>
        ) : (
          <Flex
            vertical
            gap={16}
            align="center"
            style={{ textAlign: "center" }}
          >
            <BankOutlined style={{ fontSize: 36, color: "#52c41a" }} />
            <Flex vertical gap={4} align="center">
              <Text strong>Quét mã QR để chuyển khoản</Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Dùng app ngân hàng quét mã bên dưới
              </Text>
            </Flex>

            <div
              style={{
                padding: 12,
                background: "#fff",
                border: "1px solid #f0f0f0",
                borderRadius: 10,
                display: "inline-block",
              }}
            >
              <QRCode
                value={`ORDER_${order.orderCode}_${order.totalAmount}`}
                size={160}
              />
            </div>

            <div
              style={{
                border: "1px dashed #d9d9d9",
                borderRadius: 8,
                padding: "10px 16px",
                width: "100%",
                background: "#fafafa",
              }}
            >
              <Flex justify="space-between" style={{ marginBottom: 6 }}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Nội dung
                </Text>
                <Text strong copyable style={{ fontFamily: "monospace" }}>
                  {order.orderCode}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Số tiền
                </Text>
                <Text strong style={{ color: "#ff4d4f" }}>
                  {order.totalAmount.toLocaleString()} đ
                </Text>
              </Flex>
            </div>

            <Button
              type="primary"
              size="large"
              loading={confirmLoading}
              icon={<CheckCircleOutlined />}
              onClick={handleConfirm}
              disabled={confirmed}
              style={{
                borderRadius: 8,
                minWidth: 200,
                background: confirmed ? "#52c41a" : "#52c41a",
                borderColor: confirmed ? "#52c41a" : "#52c41a",
              }}
            >
              {confirmed ? "Đã ghi nhận ✓" : "Tôi đã chuyển khoản"}
            </Button>
          </Flex>
        )}
      </Card>
    </div>
  );
};

export default PaymentPage;
