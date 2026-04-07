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
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
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
  };

  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      width: 180,
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "SĐT",
      dataIndex: "customerPhone",
    },
    {
      title: "Giao hàng",
      dataIndex: "deliveryMethod",
      render: (m: string) => (
        <Tag color="cyan">{m === "DELIVERY" ? "Giao tận nơi" : "Tại quán"}</Tag>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      render: (m: string) => <Tag color="purple">{m}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      render: (s: string) => {
        const map = statusMap[s];
        return <Tag color={map?.color}>{map?.text}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render: (p: number) => (
        <b style={{ color: "red" }}>{p.toLocaleString()} đ</b>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (d: string) => new Date(d).toLocaleString("vi-VN"),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedOrder(record);
                setIsOpenDetailModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa đơn hàng?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.orderId)}
          >
            <Tooltip title="Xóa">
              <Button danger type="text" icon={<DeleteOutlined />} />
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
        open={isOpenDetailModal}
        onClose={() => {
          setIsOpenDetailModal(false);
          setSelectedOrder(undefined);
        }}
        onSuccess={() => {
          setIsOpenDetailModal(false);
          setSelectedOrder(undefined);
          fetchOrders();
        }}
      />
    </>
  );
};

export default OrderPage;
