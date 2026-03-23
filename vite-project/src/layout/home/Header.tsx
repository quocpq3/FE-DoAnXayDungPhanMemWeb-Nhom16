import { Layout, Menu, ConfigProvider } from "antd";
import ButtonMain from "../../components/buttons/Button";
import Logo from "../../components/logo/Logo";
import { ShoppingOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./modalLogin";

const { Header } = Layout;

const items = [
  { key: "/", label: <NavLink to="/">Trang chủ</NavLink>, to: "/" },
  {
    key: "/menu",
    label: <NavLink to="/menu">Menu</NavLink>,
    to: "/menu",
  },
  {
    key: "/about",
    label: <NavLink to="/about">Giới thiệu</NavLink>,
    to: "/about",
  },
  {
    key: "/contact",
    label: <NavLink to="/contact">Liên hệ</NavLink>,
    to: "/contact",
  },
  {
    key: "/user-table",
    label: <NavLink to="/user-table">User Table</NavLink>,
    to: "/user-table",
  },
];
const HeaderLayout: React.FC = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
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
              className="font-semibold justify-center"
              mode="horizontal"
              theme="light"
              selectedKeys={[location.pathname]}
              items={items}
              style={{ flex: 1 }}
            />
          </ConfigProvider>
          <div className="flex gap-4">
            <ShoppingOutlined className="text-xl" />
            <ButtonMain onClick={() => setOpenModal(true)} color="danger">
              Đăng nhập
            </ButtonMain>
          </div>
        </div>
      </Header>
      <ModalLogin open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default HeaderLayout;
