import { Button, Card, Flex, Tag } from "antd";
import { DollarCircleFilled } from "@ant-design/icons";

const AdminDashboardPage = () => {
  return (
    <>
      <Flex gap={30}>
        <Card>
          <Flex vertical gap={16}>
            {/* Top */}
            <Flex justify="space-between" align="center">
              <Button
                size="large"
                color="danger"
                variant="filled"
                icon={<DollarCircleFilled />}
              />
              <Tag color="green">+12.5%</Tag>
            </Flex>

            {/* Bottom */}
            <Flex vertical gap={4}>
              <span className="text-sm text-gray-500">Doanh thu hàng ngày</span>
              <span className="text-2xl font-semibold">1.200.000 VNĐ</span>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
export default AdminDashboardPage;
