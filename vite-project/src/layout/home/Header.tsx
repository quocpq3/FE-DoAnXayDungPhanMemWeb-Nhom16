import { Button, Drawer, Layout, Menu } from "antd";
import ButtonMain from "../../components/buttons/Button";
import Logo from "../../components/logo/Logo";
import { ShoppingOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./modalLogin";
import { type AppRoute } from "../../routes/appRoute";
import routes from "../../routes/appRoute";

const { Header } = Layout;

const HeaderLayout: React.FC = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const genderMenuItems = (routes: AppRoute[]) => {
    return routes
      .filter((route) => route.label)
      .map((route) => {
        const path = route.index ? "/" : `/${route.path}`;
        if (!path) return null;
        return {
          key: path,
          label: <NavLink to={path}>{route.label}</NavLink>,
        };
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const mainRoutes = routes.find((r) => r.path === "/");

  const items = genderMenuItems(mainRoutes?.children || []);
  return (
    <>
      <Header style={{ background: "#fff" }}>
        <div className="container space-between">
          <Logo />
          <Menu
            className="justify-center font-semibold"
            mode="horizontal"
            theme="light"
            selectedKeys={[location.pathname]}
            items={items}
            style={{ flex: 1 }}
          />
          <div className="flex items-center gap-3">
            {/* Menu button (mobile) */}
            <Button
              icon={<ShoppingOutlined />}
              onClick={showDrawer}
              className="flex items-center justify-center md:hidden"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #f0f0f0",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            />

            {/* Login button */}
            <ButtonMain onClick={() => setOpenModal(true)} color="danger">
              Đăng nhập
            </ButtonMain>
          </div>
        </div>
      </Header>
      <ModalLogin open={openModal} setOpen={setOpenModal} />
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default HeaderLayout;
