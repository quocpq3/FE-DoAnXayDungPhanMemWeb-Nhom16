import {
  UploadOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Logo from "../../components/logo/Logo";
const { Sider } = Layout;
interface AdminSiderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const AdminSider: React.FC<AdminSiderProps> = ({ collapsed }) => {
  return (
    <>
      <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Logo collapsed={collapsed} />
        </div>
        <div className="pt-4">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
                label: "Bảng điều khiển",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Loại món ăn",
                children: [
                  {
                    key: "2-1",
                    label: "Danh sách loại",
                  },
                  {
                    key: "2-2",
                    label: "Thêm loại mới",
                  },
                ],
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Món ăn",
                children: [
                  {
                    key: "3-1",
                    label: "Danh sách món ăn",
                  },
                  {
                    key: "3-2",
                    label: "Thêm món ăn mới",
                  },
                ],
              },
              {
                key: "4",
                icon: <PhoneOutlined />,
                label: "Đơn hàng",
              },
              {
                key: "5",
                icon: <UserOutlined />,
                label: "Người dùng",
              },
            ]}
          />
        </div>
      </Sider>
    </>
  );
};
export default AdminSider;
