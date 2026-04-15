import {
  App,
  Button,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  type TableProps,
} from "antd";
import TableUI from "../../../components/table/TableUI";
import { useEffect, useState } from "react";
import { PlusOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import type { IOrder } from "../../../services/apis/order/order.interface";
import { deleteOrder, getOrders } from "../../../services/apis/order/order.api";
import OrderModal from "./OrderModal";
import { EFormType } from "../../../config/enum";
import TableToolbar from "../../../components/table/TableToolbar";

const OrderPage = () => {
  const { message } = App.useApp();

  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();

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

  const onDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      setData((prev) => prev.filter((i) => i.orderId !== id));
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };

  const handleSearch = () => {
    const keywordTrim = keyword.trim();

    if (!keywordTrim) {
      fetchOrders();
      return;
    }

    const filtered = data.filter((o) => o.orderCode.includes(keywordTrim));

    setData(filtered);
    setKeyword("");
  };

  const statusMap: Record<string, { color: string; text: string }> = {
    PENDING_PAYMENT: { color: "orange", text: "Chờ thanh toán" },
    PAID: { color: "green", text: "Đã thanh toán" },
    CANCELLED: { color: "red", text: "Đã hủy" },
    COMPLETED: { color: "blue", text: "Hoàn thành" },
    PENDING: { color: "orange", text: "Chờ xử lý" },
  };

  const deliveryMethodMap: Record<string, string> = {
    DELIVERY: "Giao tận nơi",
    PICKUP: "Tại quán",
  };

  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      width: 140,
      key: "orderCode",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "SĐT",
      dataIndex: "customerPhone",
      width: 120,
      key: "customerPhone",
    },
    {
      title: "Giao hàng",
      dataIndex: "deliveryMethod",
      width: 120,
      key: "deliveryMethod",
      render: (method: string) => (
        <Tag color="cyan">{deliveryMethodMap[method]}</Tag>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      width: 100,
      key: "paymentMethod",
      render: (method: string) => <Tag color="purple">{method}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      width: 120,
      key: "orderStatus",
      render: (status: string) => {
        const map = statusMap[status];
        return <Tag color={map?.color}>{map?.text}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      width: 120,
      key: "totalAmount",
      render: (price: number) => (
        <b style={{ color: "#d32f2f" }}>{price.toLocaleString()} đ</b>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 180,
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedOrder(record);
                setIsOpenUpdateModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa đơn hàng?"
            description="Bạn chắc chắn muốn xóa đơn hàng này?"
            okText="Xóa"
            okType="danger"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.orderId)}
          >
            <Tooltip title="Xóa">
              <Button
                danger
                type="text"
                size="small"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TableUI<IOrder>
        columns={columns}
        data={data}
        loading={loading}
        rowKey="orderId"
        leftExtra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsOpenCreateModal(true)}
          >
            Tạo đơn hàng
          </Button>
        }
        rightExtra={
          <TableToolbar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            onReload={fetchOrders}
          />
        }
      />

      <OrderModal
        formType={EFormType.CREATE}
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        onSuccess={() => {
          setIsOpenCreateModal(false);
          fetchOrders();
        }}
      />

      <OrderModal
        formType={EFormType.UPDATE}
        order={selectedOrder}
        open={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
          setSelectedOrder(undefined);
        }}
        onSuccess={() => {
          setIsOpenUpdateModal(false);
          setSelectedOrder(undefined);
          fetchOrders();
        }}
      />
    </>
  );
};

export default OrderPage;
