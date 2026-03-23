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
const objectStyles: DropdownProps["styles"] = {
  root: {
    backgroundColor: "#ffffff",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
  },
  item: {
    padding: "8px 12px",
    fontSize: "14px",
  },
  itemTitle: {
    fontWeight: "500",
  },
  itemIcon: {
    color: "#ff4d4f",
    marginRight: "8px",
  },
  itemContent: {
    backgroundColor: "transparent",
  },
};
const AdminHeader: React.FC<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const sharedProps: DropdownProps = {
    menu: { items },
    placement: "bottomLeft",
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      {" "}
      <Header
        className="flex items-center justify-between"
        style={{ padding: 0, background: colorBgContainer }}
      >
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
        <div className="pr-4">
          <Space vertical size="large">
            <Dropdown {...sharedProps} styles={objectStyles}>
              <Button danger>
                <Space>
                  <UserOutlined />
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </div>
      </Header>
    </>
  );
};
export default AdminHeader;
