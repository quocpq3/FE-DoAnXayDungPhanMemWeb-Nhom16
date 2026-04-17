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
  Button,
  InputNumber,
} from "antd";
import type {
  IOrder,
  IOrderCreate,
  IOrderItemCreate,
} from "../../../services/apis/order/order.interface";
import { useEffect, useState } from "react";
import { EFormType } from "../../../config/enum";
import {
  createOrder,
  updateOrder,
} from "../../../services/apis/order/order.api";
import { useFood } from "../../../context/FoodContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  formType: string;
  order?: IOrder;
}

const OrderModal = ({ open, onClose, onSuccess, formType, order }: Props) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { foods } = useFood();

  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<IOrderItemCreate[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (formType === EFormType.UPDATE && order) {
      form.setFieldsValue({
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        deliveryMethod: order.deliveryMethod,
      });

      setItems(order.items || []);
    } else {
      form.resetFields();
      setItems([]);
      setQuantity(1);
      setSelectedItemId(undefined);
    }
  }, [order, formType, form]);

  const handleAddItem = () => {
    if (!selectedItemId || quantity <= 0) return;

    const food = foods.find((f) => f.itemId === selectedItemId);
    if (!food) return;

    setItems((prev) => {
      const existed = prev.find((i) => i.itemId === selectedItemId);

      if (existed) {
        return prev.map((i) =>
          i.itemId === selectedItemId
            ? {
              ...i,
              quantity: i.quantity + quantity,
              lineTotal: (i.quantity + quantity) * i.unitPrice,
            }
            : i,
        );
      }

      return [
        ...prev,
        {
          itemId: food.itemId,
          itemName: food.itemName,
          imageUrl: food.imageUrl,
          quantity,
          unitPrice: food.salePrice,
          lineTotal: quantity * food.salePrice,
        },
      ];
    });

    setQuantity(1);
    setSelectedItemId(undefined);
  };

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.itemId !== id));
  };

  const totalAmount = items.reduce((sum, i) => sum + i.lineTotal, 0);

  const onCreate = async (formData: IOrderCreate) => {
    if (items.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 món");
      return;
    }

    try {
      setIsLoading(true);

      await createOrder({
        ...formData,
        items,
        totalAmount,
      });

      message.success("Tạo đơn hàng thành công");
      form.resetFields();
      setItems([]);
      onSuccess();
    } catch {
      message.error("Tạo đơn hàng thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (formData: IOrderCreate) => {
    if (!order) {
      message.error("Không tìm thấy đơn hàng");
      return;
    }

    try {
      setIsLoading(true);

      await updateOrder(order.orderId, {
        ...formData,
        items,
        totalAmount,
      });

      message.success("Cập nhật đơn hàng thành công");
      form.resetFields();
      setItems([]);
      onSuccess();
    } catch {
      message.error("Cập nhật đơn hàng thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const statusMap: Record<string, { color: string; text: string }> = {
    PENDING_PAYMENT: { color: "orange", text: "Chờ thanh toán" },
    PAID: { color: "green", text: "Đã thanh toán" },
    CANCELLED: { color: "red", text: "Đã hủy" },
    COMPLETED: { color: "blue", text: "Hoàn thành" },
    PENDING: { color: "orange", text: "Chờ xử lý" },
  };

  const itemColumns = [
    { title: "Tên", dataIndex: "itemName" },
    { title: "SL", dataIndex: "quantity" },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      render: (p: number) => p.toLocaleString() + " đ",
    },
    {
      title: "Thành tiền",
      dataIndex: "lineTotal",
      render: (p: number) => (
        <b style={{ color: "#1677ff" }}>{p.toLocaleString()} đ</b>
      ),
    },
    {
      title: "",
      render: (record: IOrderItemCreate) => (
        <Button danger onClick={() => handleRemoveItem(record.itemId)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      confirmLoading={isLoading}
      width={900}
      title={
        formType === EFormType.CREATE ? "TẠO ĐƠN HÀNG" : "CẬP NHẬT ĐƠN HÀNG"
      }
      onOk={() => form.submit()}
      okText={formType === EFormType.CREATE ? "Tạo" : "Cập nhật"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={formType === EFormType.CREATE ? onCreate : onUpdate}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="customerName"
              label="Tên khách"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="customerPhone"
              label="SĐT"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="deliveryAddress" label="Địa chỉ">
          <Input.TextArea />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="paymentMethod"
              label="Thanh toán"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="CASH">Tiền mặt</Select.Option>
                <Select.Option value="CARD">Thẻ</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="deliveryMethod"
              label="Giao hàng"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="DELIVERY">Giao hàng</Select.Option>
                <Select.Option value="PICKUP">Tại quán</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider>Chọn món</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Select
              placeholder="Chọn món"
              value={selectedItemId}
              style={{ width: "100%" }}
              onChange={(v) => setSelectedItemId(v)}
              options={foods.map((f) => ({
                label: `${f.itemName} - ${f.salePrice.toLocaleString()}đ`,
                value: f.itemId,
              }))}
            />
          </Col>

          <Col span={6}>
            <InputNumber
              min={1}
              value={quantity}
              style={{ width: "100%" }}
              onChange={(v) => setQuantity(Number(v))}
            />
          </Col>

          <Col span={6}>
            <Button type="primary" onClick={handleAddItem} block>
              Thêm
            </Button>
          </Col>
        </Row>

        <Divider />

        <Table
          dataSource={items}
          columns={itemColumns}
          rowKey="itemId"
          pagination={false}
        />

        <Divider />

        <h2 style={{ color: "red" }}>
          Tổng tiền: {totalAmount.toLocaleString()} đ
        </h2>
      </Form>

      {formType === EFormType.UPDATE && order && (
        <>
          <Divider />

          <p>
            <b>Mã đơn:</b> {order.orderCode}
          </p>

          <p>
            <b>Trạng thái:</b> <Tag color={statusMap[order.orderStatus].color}>{statusMap[order.orderStatus].text}</Tag>
          </p>
        </>
      )}
    </Modal>
  );
};

export default OrderModal;
