import { Layout, Menu, ConfigProvider } from "antd";
import ButtonMain from "../../components/buttons/Button";
import Logo from "../../components/logo/Logo";
import { ShoppingOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Header } = Layout;

const items = [
  { key: "/", label: <NavLink to="/">Home</NavLink>, to: "/" },
  { key: "/menu", label: <NavLink to="/menu">Menu</NavLink>, to: "/menu" },
  {
    key: "/about",
    label: <NavLink to="/about">About Us</NavLink>,
    to: "/about",
  },
  {
    key: "/contact",
    label: <NavLink to="/contact">Contact</NavLink>,
    to: "/contact",
  },
];
const HeaderLayout: React.FC = () => {
  const location = useLocation();
  return (
    <Header style={{ background: "#fff" }}>
      <div className="container space-between">
        <Logo />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff4d4f",
            },
          }}
        >
          <Menu
            className="font-semibold"
            mode="horizontal"
            theme="light"
            selectedKeys={[location.pathname]}
            items={items}
          />
        </ConfigProvider>
        <div className="flex gap-4">
          <ShoppingOutlined className="text-xl" />
          <ButtonMain color="danger">Sign Up</ButtonMain>
        </div>
      </div>
    </Header>
  );
};

export default HeaderLayout;
