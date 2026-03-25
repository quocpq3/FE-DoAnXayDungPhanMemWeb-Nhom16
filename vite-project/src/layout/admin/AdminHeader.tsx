import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown, Space, theme } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import type { CSSProperties } from "react";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Profile",
  },
  {
    key: "2",
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

// ✅ chỉ style container thôi
const overlayStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #d9d9d9",
  borderRadius: "6px",
};

const AdminHeader: React.FC<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dropdownProps: DropdownProps = {
    menu: { items },
    placement: "bottomRight",
  };

  return (
    <Header
      className="flex items-center justify-between"
      style={{ padding: 0, background: colorBgContainer }}
    >
      {/* Toggle sidebar */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      {/* User dropdown */}
      <div className="pr-4">
        <Dropdown {...dropdownProps} overlayStyle={overlayStyle}>
          <Button type="text">
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader;
