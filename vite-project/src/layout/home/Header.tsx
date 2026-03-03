import { Layout, Menu } from "antd";
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
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        background: "#fff",
      }}
    >
      <Logo />
      <Menu
        className="font-semibold"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
      />
      <div className="flex gap-4">
        <ShoppingOutlined className="text-xl" />
        <ButtonMain>Sign Up</ButtonMain>
      </div>
    </Header>
  );
};

export default HeaderLayout;
