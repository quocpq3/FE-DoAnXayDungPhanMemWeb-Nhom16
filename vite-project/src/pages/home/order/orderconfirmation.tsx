import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Form,
  Input,
  Radio,
  Button,
  Divider,
  Row,
  Col,
  Card,
  Space,
  Flex,
  List,
  Avatar,
  Badge,
  App,
} from "antd";
import {
  CreditCardOutlined,
  MoneyCollectOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../../../context/CartContext";
import type { IFood } from "../../../services/apis/food/food.interface";
import {
  type ICheckoutForm,
  type IOrderCreate,
  type IOrderItemCreate,
} from "../../../services/apis/order/order.interface";
import { createOrder } from "../../../services/apis/order/order.api";

const { Title, Text } = Typography;

const OrderConfirmationPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];
  const totalAmount = cartContext?.totalAmount || 0;

  const shippingFee = cartItems.length > 0 ? 30000 : 0;
  const finalTotal = totalAmount + shippingFee;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [form] = Form.useForm();

  const onFinish = async (values: ICheckoutForm) => {
    if (cartItems.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 món");
      return;
    }

    try {
      setIsLoading(true);

      const items: IOrderItemCreate[] = cartItems.map(
        (item: IFood & { quantity: number }) => ({
          itemId: item.itemId,
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: item.salePrice,
          lineTotal: item.salePrice * item.quantity,
        }),
      );

      const payload: IOrderCreate = {
        customerName: values.fullName,
        customerPhone: values.phone,
        deliveryAddress: values.address,
        note: values.note || "",
        paymentMethod:
          values.paymentMethod === "cod" ? "CASH" : "BANK_TRANSFER",
        deliveryMethod: "DELIVERY",
        totalAmount: finalTotal,
        items,
      };

      const res = await createOrder(payload);
      form.resetFields();
      cartContext?.clearCart?.();
      const isCash = payload.paymentMethod === "CASH";
      if (isCash) {
        message.success("Đặt hàng thành công");
        navigate("/");
        return;
      }
      message.success("Đơn hàng đã tạo, vui lòng thanh toán");
      navigate(`/payment/${res.orderId}`);
    } catch (error) {
      console.error(error);
      message.error("Đặt hàng thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const displayTotal = cartItems.length > 0 ? totalAmount : 285000;
  const displayFinalTotal = cartItems.length > 0 ? finalTotal : 315000;
  const displayShipping = 30000;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <div
          style={{
            padding: "32px 16px 60px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={15}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  border: "1px solid #f0f0f0",
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Title level={4} style={{ marginBottom: 24, fontWeight: 700 }}>
                  1. Thông tin giao hàng
                </Title>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<Text strong>Họ và tên</Text>}
                        name="fullName"
                        rules={[
                          { required: true, message: "Vui lòng nhập họ tên!" },
                        ]}
                      >
                        <Input size="large" style={{ borderRadius: 8 }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<Text strong>Số điện thoại</Text>}
                        name="phone"
                        rules={[
                          { required: true, message: "Vui lòng nhập SĐT!" },
                        ]}
                      >
                        <Input size="large" style={{ borderRadius: 8 }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label={<Text strong>Email</Text>}
                    name="email"
                    rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                  >
                    <Input size="large" style={{ borderRadius: 8 }} />
                  </Form.Item>

                  <Form.Item
                    label={<Text strong>Địa chỉ</Text>}
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ!" },
                    ]}
                  >
                    <Input size="large" style={{ borderRadius: 8 }} />
                  </Form.Item>

                  <Form.Item label={<Text strong>Ghi chú</Text>} name="note">
                    <Input.TextArea rows={3} style={{ borderRadius: 8 }} />
                  </Form.Item>

                  <Divider style={{ margin: "24px 0" }} />

                  <Title
                    level={4}
                    style={{ marginBottom: 20, fontWeight: 700 }}
                  >
                    2. Thanh toán
                  </Title>

                  <Form.Item name="paymentMethod" initialValue="cod">
                    <Radio.Group style={{ width: "100%" }}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Card
                          size="small"
                          hoverable
                          style={{ borderRadius: 12 }}
                          bodyStyle={{ padding: 16 }}
                        >
                          <Radio value="cod" style={{ width: "100%" }}>
                            <Flex justify="space-between">
                              <Text>Thanh toán khi nhận hàng</Text>
                              <MoneyCollectOutlined />
                            </Flex>
                          </Radio>
                        </Card>

                        <Card
                          size="small"
                          hoverable
                          style={{ borderRadius: 12 }}
                          bodyStyle={{ padding: 16 }}
                        >
                          <Radio value="vnpay" style={{ width: "100%" }}>
                            <Flex justify="space-between">
                              <Text>Thanh toán VNPay</Text>
                              <CreditCardOutlined />
                            </Flex>
                          </Radio>
                        </Card>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={9}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  border: "1px solid #f0f0f0",
                  position: "sticky",
                  top: 24,
                }}
                bodyStyle={{ padding: 20 }}
              >
                <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                  <ShoppingCartOutlined style={{ color: "#ff4d4f" }} />
                  <Title level={4} style={{ margin: 0 }}>
                    Tóm tắt đơn hàng
                  </Title>
                </Flex>

                <List
                  dataSource={cartItems}
                  renderItem={(item: IFood & { quantity: number }) => (
                    <List.Item
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px dashed #f0f0f0",
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge count={item.quantity}>
                            <Avatar
                              src={item.imageUrl}
                              shape="square"
                              size={56}
                              style={{ borderRadius: 8 }}
                            />
                          </Badge>
                        }
                        title={<Text strong>{item.itemName}</Text>}
                        description={
                          <Text type="secondary">
                            {item.salePrice.toLocaleString()} đ
                          </Text>
                        }
                      />
                      <Text strong>
                        {(item.salePrice * item.quantity).toLocaleString()} đ
                      </Text>
                    </List.Item>
                  )}
                />

                <div style={{ marginTop: 20 }}>
                  <Flex justify="space-between" style={{ marginBottom: 8 }}>
                    <Text type="secondary">
                      Tạm tính ({cartItems.reduce((a, b) => a + b.quantity, 0)}{" "}
                      món)
                    </Text>
                    <Text>{displayTotal.toLocaleString()} đ</Text>
                  </Flex>

                  <Flex justify="space-between" style={{ marginBottom: 16 }}>
                    <Text type="secondary">Phí ship</Text>
                    <Text>{displayShipping.toLocaleString()} đ</Text>
                  </Flex>

                  <Divider style={{ margin: "12px 0" }} />

                  <Flex justify="space-between" align="center">
                    <Text strong>Tổng cộng</Text>
                    <Text strong style={{ color: "#ff4d4f", fontSize: 18 }}>
                      {displayFinalTotal.toLocaleString()} đ
                    </Text>
                  </Flex>

                  <Button
                    type="primary"
                    danger
                    size="large"
                    block
                    loading={isLoading}
                    style={{
                      marginTop: 16,
                      height: 52,
                      borderRadius: 10,
                      fontWeight: 600,
                    }}
                    icon={<CheckCircleOutlined />}
                    onClick={() => form.submit()}
                  >
                    Xác nhận đặt hàng
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderConfirmationPage;
