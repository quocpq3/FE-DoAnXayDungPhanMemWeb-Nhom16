import { App, Avatar, Button, Flex, Space, Tag, Tooltip, Typography, type TableProps } from "antd";
import TableUI from "../../../components/table/TableUI";
import { useState } from "react";
import {
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import type {
  IOrder,
  IOrderCreate,
} from "../../../services/apis/order/order.interface";
import { updateOrder } from "../../../services/apis/order/order.api";
import OrderModal from "./OrderModal";
import TableToolbar from "../../../components/table/TableToolbar";
import { useOrder } from "../../../context/OrderContext";
import StatsCard from "../../../components/card/StatsCard";

const OrderPage = () => {
  const { message } = App.useApp();
  const { Text } = Typography;
  const { orders, loading, refresh: fetchOrders } = useOrder();

  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [keyword, setKeyword] = useState("");


  const mapOrderToUpdate = (record: IOrder): IOrderCreate => ({
    customerName: record.customerName || "",
    customerPhone: record.customerPhone || "",
    deliveryAddress: record.deliveryAddress,
    paymentMethod: record.paymentMethod,
    deliveryMethod: record.deliveryMethod,
    note: record.note,
    totalAmount: record.totalAmount,
    items: record.items.map((i) => ({
      itemId: i.itemId,
      itemName: i.itemName,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      lineTotal: i.lineTotal,
      imageUrl: i.imageUrl,
    })),
  });

  const handleUpdateStatus = async (record: IOrder, status: string) => {
    try {
      await updateOrder(record.orderId, {
        ...mapOrderToUpdate(record),
        orderStatus: status,
      });
      message.success("Cập nhật trạng thái thành công");
      await fetchOrders();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      render: (code: string) => (
        <Text strong style={{ fontSize: 13, color: "#1677ff" }}>
          {code}
        </Text>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      render: (name: string, record: IOrder) => (
        <Flex align="center" gap={8}>
          <Avatar size={30} icon={<UserOutlined />} />
          <Flex vertical>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>{name || "Khách vãng lai"}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{record.customerPhone || "—"}</Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      align: "right",
      render: (amount: number) => (
        <Text strong style={{ color: "#ff4d4f" }}>
          {amount.toLocaleString("vi-VN")} đ
        </Text>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      align: "center",
      render: (method: string) => (
        <Tag color={method === "CASH" ? "cyan" : "purple"}>
          {method === "CASH" ? "Tiền mặt" : "Chuyển khoản"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      render: (_, r) => {
        const map = {
          PENDING: { color: "orange", text: "Chờ xử lý" },
          PAID: { color: "green", text: "Đã thanh toán" },
          COMPLETED: { color: "blue", text: "Hoàn thành" },
          CANCELLED: { color: "red", text: "Đã hủy" },
        }[r.orderStatus];

        return <Tag color={map?.color}>{map?.text}</Tag>;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (time: string) => (
        <Flex align="center" gap={4}>
          <ClockCircleOutlined style={{ color: "#888", fontSize: 12 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(time).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Flex>
      ),
    },
    {
      title: "Hành động",
      render: (_, r) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedOrder(r);
                setIsOpenModal(true);
              }}
            />
          </Tooltip>

          {r.orderStatus === "PENDING" && (
            <>
              <Tooltip title="Đã thanh toán">
                <Button
                  type="text"
                  icon={<DollarCircleOutlined style={{ color: "green" }} />}
                  onClick={() => handleUpdateStatus(r, "PAID")}
                />
              </Tooltip>

              <Tooltip title="Hủy đơn">
                <Button
                  type="text"
                  danger
                  icon={<ExclamationCircleOutlined />}
                  onClick={() => handleUpdateStatus(r, "CANCELLED")}
                />
              </Tooltip>
            </>
          )}

          {r.orderStatus === "PAID" && (
            <Tooltip title="Hoàn thành">
              <Button
                type="text"
                icon={<CheckCircleOutlined style={{ color: "blue" }} />}
                onClick={() => handleUpdateStatus(r, "COMPLETED")}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap={16}>
        <Flex gap={12}>
          <StatsCard
            icon={<ShoppingCartOutlined />}
            title="Tổng đơn"
            value={orders.length}
            variant="primary"
          />
          <StatsCard
            icon={<ExclamationCircleOutlined />}
            title="Chờ xử lý"
            value={orders.filter((o) => o.orderStatus === "PENDING").length}
            variant="warning"
          />
          <StatsCard
            icon={<DollarCircleOutlined />}
            title="Đã thanh toán"
            value={orders.filter((o) => o.orderStatus === "PAID").length}
            variant="success"
          />
          <StatsCard
            icon={<CheckCircleOutlined />}
            title="Hoàn thành"
            value={orders.filter((o) => o.orderStatus === "COMPLETED").length}
            variant="success"
          />
        </Flex>

        <TableUI<IOrder>
          columns={columns}
          data={orders}
          loading={loading}
          rowKey="orderId"
          rightExtra={
            <TableToolbar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={() => { }}
              onReload={fetchOrders}
            />
          }
        />
      </Flex>

      <OrderModal
        open={isOpenModal}
        order={selectedOrder}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default OrderPage;
