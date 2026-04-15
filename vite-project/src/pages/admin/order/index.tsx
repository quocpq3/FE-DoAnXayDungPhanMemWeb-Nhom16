import {
  App,
  Button,
  Flex,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  type TableProps,
} from "antd";
import TableUI from "../../../components/table/TableUI";
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import type { IOrder } from "../../../services/apis/order/order.interface";
import { deleteOrder, getOrders } from "../../../services/apis/order/order.api";
import OrderModal from "./OrderModal";
import { EFormType } from "../../../config/enum";
import TableToolbar from "../../../components/table/TableToolbar";
import StatsCard from "../../../components/card/StatsCard";

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
      title: "Đơn hàng",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.orderCode}</div>

          <div style={{ fontSize: 12, color: "#888" }}>
            {new Date(record.createdAt).toLocaleString("vi-VN")}
          </div>
        </div>
      ),
    },

    {
      title: "Khách hàng",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.customerName}</div>
          <div style={{ fontSize: 12, color: "#888" }}>
            {record.customerPhone}
          </div>
        </div>
      ),
    },

    {
      title: "Thanh toán",
      align: "center",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Tag color="purple">{deliveryMethodMap[record.deliveryMethod]}</Tag>

          <Tag color="cyan">{record.paymentMethod}</Tag>
        </Space>
      ),
    },

    {
      title: "Trạng thái",
      align: "center",
      render: (_, record) => {
        const map = statusMap[record.orderStatus];

        return <Tag color={map?.color}>{map?.text}</Tag>;
      },
    },

    {
      title: "Tổng tiền",
      align: "right",
      render: (_, record) => (
        <div style={{ fontWeight: 700, color: "#ff4d4f" }}>
          {record.totalAmount.toLocaleString()} đ
        </div>
      ),
    },

    {
      title: "Hành động",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedOrder(record);
                setIsOpenUpdateModal(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa đơn hàng?"
            onConfirm={() => onDelete(record.orderId)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap={16}>
        <Flex gap={16}>
          <StatsCard
            title="Tổng đơn"
            value={data.length}
            icon={<AppstoreOutlined />}
            variant="primary"
          />
          <StatsCard
            title="Chờ xử lý"
            value={data.filter((o) => o.orderStatus === "PENDING").length}
            icon={<ExclamationCircleOutlined />}
            variant="warning"
          />
          <StatsCard
            title="Hoàn thành"
            value={data.filter((o) => o.orderStatus === "COMPLETED").length}
            icon={<CheckCircleOutlined />}
            variant="success"
          />
          <StatsCard
            title="Doanh thu"
            value={
              data
                .filter((o) => o.orderStatus === "COMPLETED")
                .reduce((sum, o) => sum + o.totalAmount, 0)
                .toLocaleString() + " đ"
            }
            icon={<DollarCircleOutlined />}
            variant="danger"
          />
        </Flex>
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
      </Flex>
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
