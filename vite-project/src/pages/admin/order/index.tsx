import { App, Button, Flex, Space, Tag, Tooltip, type TableProps } from "antd";
import TableUI from "../../../components/table/TableUI";
import { useEffect, useState } from "react";
import {
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import type {
  IOrder,
  IOrderCreate,
} from "../../../services/apis/order/order.interface";
import { getOrders, updateOrder } from "../../../services/apis/order/order.api";
import OrderModal from "./OrderModal";
import TableToolbar from "../../../components/table/TableToolbar";
import StatsCard from "../../../components/card/StatsCard";

const OrderPage = () => {
  const { message } = App.useApp();

  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [keyword, setKeyword] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const mapOrderToUpdate = (record: IOrder): IOrderCreate => ({
    customerName: record.customerName,
    customerPhone: record.customerPhone,
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
    })),
  });

  const handleUpdateStatus = async (record: IOrder, status: string) => {
    const oldData = [...data];
    setData((prev) =>
      prev.map((o) =>
        o.orderId === record.orderId ? { ...o, orderStatus: status } : o,
      ),
    );

    try {
      await updateOrder(record.orderId, {
        ...mapOrderToUpdate(record),
        orderStatus: status,
      });
    } catch {
      setData(oldData);
      message.error("Cập nhật thất bại");
    }
  };

  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "Đơn hàng",
      render: (_, r) => (
        <div>
          <b>{r.orderCode}</b>
          <div style={{ fontSize: 12 }}>
            {new Date(r.createdAt).toLocaleString("vi-VN")}
          </div>
        </div>
      ),
    },
    {
      title: "Khách hàng",
      render: (_, r) => (
        <div>
          <b>{r.customerName}</b>
          <div style={{ fontSize: 12 }}>{r.customerPhone}</div>
        </div>
      ),
    },
    {
      title: "Thanh toán",
      render: (_, r) => (
        <Space direction="vertical" size={0}>
          <Tag color="purple">
            {r.deliveryMethod === "DELIVERY" ? "Giao tận nơi" : "Tại quán"}
          </Tag>
          <Tag color="cyan">
            {r.paymentMethod === "CASH" ? "Tiền mặt" : "Chuyển khoản"}
          </Tag>
        </Space>
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
            icon={<AppstoreOutlined />}
            title="Tổng đơn"
            value={data.length}
            variant="primary"
          />
          <StatsCard
            icon={<ExclamationCircleOutlined />}
            title="Chờ xử lý"
            value={data.filter((o) => o.orderStatus === "PENDING").length}
            variant="warning"
          />
          <StatsCard
            icon={<DollarCircleOutlined />}
            title="Đã thanh toán"
            value={data.filter((o) => o.orderStatus === "PAID").length}
            variant="success"
          />

          <StatsCard
            icon={<CheckCircleOutlined />}
            title="Hoàn thành"
            value={data.filter((o) => o.orderStatus === "COMPLETED").length}
            variant="success"
          />
        </Flex>
        <TableUI<IOrder>
          columns={columns}
          data={data}
          loading={loading}
          rowKey="orderId"
          rightExtra={
            <TableToolbar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={() => {}}
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
