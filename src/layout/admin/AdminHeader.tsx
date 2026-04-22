import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  QuestionOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown, Input, Flex, Avatar, Switch } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import { useEffect, useState, type CSSProperties } from "react";

const { Header } = Layout;
const { Search } = Input;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    key: "3",
    label: "Help",
    icon: <QuestionOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: <a href="/login">Logout</a>,
    icon: <LogoutOutlined />,
    danger: true,
  },
];

//chỉ style container thôi
const overlayStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #d9d9d9",
  borderRadius: "6px",
};

const AdminHeader: React.FC<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const dropdownProps: DropdownProps = {
    menu: { items },
    placement: "bottomRight",
  };

  return (
    <Header
      className="flex items-center justify-between"
      style={{
        padding: 0,
        background: isScrolled ? "rgba(255,255,255,0.6)" : "transparent",

        backdropFilter: isScrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",

        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Toggle sidebar */}
      <Flex align="center" gap="12px" className="pl-4">
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
        <Search
          placeholder="search"
          // onSearch={onSearch}
          style={{ width: 400 }}
        />
      </Flex>

      {/* User dropdown */}
      <div className="pr-4">
        <Flex align="center" justify="space-between" gap={14}>
          <Button
            icon={<BellOutlined style={{ fontSize: "20px" }} />}
            type="text"
          />
          <Button
            icon={<MessageOutlined style={{ fontSize: "20px" }} />}
            type="text"
          />
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            defaultChecked
          />
          <Dropdown {...dropdownProps} overlayStyle={overlayStyle}>
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              shape="square"
              size="large"
            />
          </Dropdown>
        </Flex>
      </div>
    </Header>
  );
};

export default AdminHeader;
