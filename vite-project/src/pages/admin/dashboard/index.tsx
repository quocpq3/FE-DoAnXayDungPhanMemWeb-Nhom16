import { useMemo } from "react";
import {
  Card,
  Flex,
  Tag,
  Avatar,
  Typography,
  Table,
  Divider,
  Statistic,
  Spin,
  Progress,
} from "antd";

import {
  DollarCircleFilled,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  FireFilled,
} from "@ant-design/icons";

import StatsCard from "../../../components/card/StatsCard";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useFood } from "../../../context/FoodContext";
import { useUser } from "../../../context/UserRolesContext";
import { useOrder } from "../../../context/OrderContext";
import type { IOrderItem } from "../../../services/apis/order/order.interface";

const { Text, Title } = Typography;

const statusMap: Record<string, { color: string; text: string }> = {
  PENDING: { color: "orange", text: "Chờ xử lý" },
  PAID: { color: "green", text: "Đã thanh toán" },
  COMPLETED: { color: "blue", text: "Hoàn thành" },
  CANCELLED: { color: "red", text: "Đã hủy" },
};

const columns = [
  {
    title: "Mã đơn",
    dataIndex: "orderCode",
    key: "orderCode",
    render: (v: string) => <Text strong style={{ color: "#1677ff" }}>{v}</Text>,
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
    render: (v: string) => (
      <Flex align="center" gap={8}>
        <Avatar size="small" icon={<UserOutlined />} />
        <Text style={{ fontSize: 13 }}>{v || "Khách vãng lai"}</Text>
      </Flex>
    ),
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalAmount",
    key: "totalAmount",
    align: "right" as const,
    render: (v: number) => (
      <Text strong style={{ color: "#ff4d4f" }}>
        {Number(v || 0).toLocaleString("vi-VN")} đ
      </Text>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (s: string) => {
      const st = statusMap[s];
      return <Tag color={st?.color}>{st?.text}</Tag>;
    },
  },
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (t: string) => (
      <Flex align="center" gap={6}>
        <ClockCircleOutlined />
        <Text type="secondary">
          {t
            ? new Date(t).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })
            : "--"}
        </Text>
      </Flex>
    ),
  },
];


const AdminDashboardPage = () => {
  const { foods, loading: foodLoading } = useFood();
  const { users, loading: userLoading } = useUser();
  const { orders, loading: orderLoading } = useOrder();

  //thống kê món ăn đang hoạt động
  const availableFoods = useMemo(
    () => foods.filter((f) => f.isAvailable).length,
    [foods]
  );

  const totalRevenue = useMemo(
    () => orders.filter(o => o.orderStatus !== 'CANCELLED').reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    [orders]
  );

  // biểu đồ doanh thu
  const revenueChartData = useMemo(() => {
    const dailyMap: Record<string, number> = {};

    // lấy 7 ngày gần nhất
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      dailyMap[dateStr] = 0;
    }

    orders.filter(o => o.orderStatus !== 'CANCELLED').forEach(o => {
      const date = new Date(o.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      if (dailyMap[date] !== undefined) {
        dailyMap[date] += o.totalAmount;
      }
    });

    return Object.entries(dailyMap).map(([date, revenue]) => ({
      date,
      revenue
    }));
  }, [orders]);

  // tỉ lệ theo loại
  const categoryChartData = useMemo(() => {
    const map: Record<string, number> = {};

    foods.forEach((f) => {
      if (f.categoryName) {
        map[f.categoryName] = (map[f.categoryName] || 0) + 1;
      }
    });

    const colors = ["#ff4d4f", "#fa8c16", "#1677ff", "#722ed1", "#52c41a"];

    const total = foods.length || 1;

    return Object.entries(map).map(([name, value], i) => ({
      name,
      value: Math.round((value / total) * 100),
      color: colors[i % colors.length],
    }));
  }, [foods]);

  //top các món được order nhiều nhất
  const topFoods = useMemo(() => {
    const map: Record<string, { name: string; orders: number }> = {};

    orders.forEach((o) => {
      o.items?.forEach((it: IOrderItem) => {
        const name = it.itemName || "Unknown";

        if (!map[name]) {
          map[name] = { name, orders: 0 };
        }

        map[name].orders += it.quantity || 0;
      });
    });

    return Object.values(map)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  }, [orders]);

  // loading
  const loading = foodLoading || userLoading || orderLoading;

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={20}>
        <Flex gap={16} wrap="wrap">
          <StatsCard
            title="Doanh thu"
            value={`${(totalRevenue / 1_000_000).toFixed(1)}M đ`}
            icon={<DollarCircleFilled />}
            variant="danger"
          />

          <StatsCard
            title="Đơn hàng"
            value={orders.length}
            icon={<ShoppingCartOutlined />}
            variant="primary"
          />

          <StatsCard
            title="Món ăn"
            value={availableFoods}
            icon={<AppstoreOutlined />}
            variant="success"
          />

          <StatsCard
            title="Khách hàng"
            value={users.length}
            icon={<UserOutlined />}
            variant="purple"
          />
        </Flex>

        {/* charts */}
        <Flex gap={16}>
          <Card style={{ flex: 3, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>Biểu đồ doanh thu</Title>
                <Text type="secondary" style={{ fontSize: 12 }}>7 ngày gần nhất</Text>
              </div>
              <Tag color="green" icon={<ArrowUpOutlined />}>Tăng trưởng</Tag>
            </Flex>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v: any) => [Number(v || 0).toLocaleString('vi-VN') + ' đ', 'Doanh thu']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ff4d4f" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ flex: 1, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Title level={5} style={{ marginBottom: 24 }}>Tổng quan</Title>

            <Flex vertical gap={24}>
              <div>
                <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>Tổng doanh thu</Text>
                <Statistic
                  value={totalRevenue}
                  formatter={(v) => (
                    <Text strong style={{ fontSize: 24, color: '#ff4d4f' }}>
                      {Number(v).toLocaleString("vi-VN")} đ
                    </Text>
                  )}
                />
              </div>

              <Divider style={{ margin: '0' }} />

              <Flex justify="space-between">
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>Đơn hàng</Text>
                  <Title level={4} style={{ margin: 0 }}>{orders.length}</Title>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>Danh mục</Text>
                  <Title level={4} style={{ margin: 0 }}>{categoryChartData.length}</Title>
                </div>
              </Flex>

              <div style={{ background: '#fff1f0', padding: '12px', borderRadius: 8 }}>
                <Flex align="center" gap={8}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4d4f' }} />
                  <Text style={{ fontSize: 12, color: '#cf1322' }}>
                    Hệ thống đang hoạt động ổn định
                  </Text>
                </Flex>
              </div>
            </Flex>
          </Card>
        </Flex>

        {/* món bán chạy + tỉ lệ danh mục */}
        <Flex gap={16}>
          <Card style={{ flex: 2, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
              <FireFilled style={{ color: '#ff4d4f' }} />
              <Title level={5} style={{ margin: 0 }}>Món bán chạy</Title>
            </Flex>

            <Flex vertical gap={10}>
              {topFoods.map((f, i) => {
                const maxOrders = topFoods[0]?.orders || 1;
                const percent = Math.round((f.orders / maxOrders) * 100);
                const colors = ["#ff4d4f", "#fa8c16", "#1677ff", "#722ed1", "#52c41a"];

                return (
                  <div key={f.name} style={{ marginBottom: 12 }}>
                    <Flex justify="space-between" style={{ marginBottom: 4 }}>
                      <Text style={{ fontSize: 13 }}>{i + 1}. {f.name}</Text>
                      <Text strong style={{ fontSize: 13 }}>{f.orders} đơn</Text>
                    </Flex>
                    <Progress
                      percent={percent}
                      showInfo={false}
                      strokeColor={colors[i % colors.length]}
                      size={{ height: 6 }}
                    />
                  </div>
                );
              })}
            </Flex>
          </Card>

          <Card style={{ flex: 1, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Title level={5} style={{ marginBottom: 20 }}>Tỉ lệ danh mục</Title>

            <Flex vertical align="center" gap={16}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => [`${v}%`, 'Tỉ lệ']}
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ width: '100%' }}>
                <Flex vertical gap={10}>
                  {categoryChartData.map((c) => (
                    <Flex key={c.name} justify="space-between" align="center">
                      <Flex align="center" gap={8}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
                        <Text style={{ fontSize: 13, color: '#555' }}>{c.name}</Text>
                      </Flex>
                      <Text strong style={{ fontSize: 13 }}>{c.value}%</Text>
                    </Flex>
                  ))}
                </Flex>
              </div>
            </Flex>
          </Card>
        </Flex>
        <Card>
          <Title level={5}>Đơn hàng gần đây</Title>

          <Table
            columns={columns}
            dataSource={orders.slice(0, 6)}
            rowKey="orderId"
            pagination={false}
          />
        </Card>
      </Flex>
    </Spin>
  );
};

export default AdminDashboardPage;