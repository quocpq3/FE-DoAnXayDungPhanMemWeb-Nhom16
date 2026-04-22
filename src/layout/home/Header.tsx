import { Button, Badge, Layout, Menu } from "antd";
import ButtonMain from "../../components/buttons/Button";
import Logo from "../../components/logo/Logo";
import { ShoppingOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./modalLogin";
import ShoppingCartDrawer from "../../components/cart/ShoppingCartDrawer";
import { useCart } from "../../hooks/useCart";
import { type AppRoute } from "../../routes/appRoute";
import routes from "../../routes/appRoute";

const { Header } = Layout;

const HeaderLayout: React.FC = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  const [user, setUser] = useState<any>(null);

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

  const showCart = () => {
    setCartOpen(true);
  };

  const onCloseCart = () => {
    setCartOpen(false);
  };

  const mainRoutes = routes.find((r) => r.path === "/");
  const items = genderMenuItems(mainRoutes?.children || []);

  return (
    <>
      <Header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #f0f0f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 64,
        }}
      >
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
            <Badge count={totalItems} offset={[-5, 5]}>
              <Button
                icon={<ShoppingOutlined />}
                onClick={showCart}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              />
            </Badge>
            {!user && (
              <ButtonMain onClick={() => setOpenModal(true)} color="danger">
                Đăng nhập
              </ButtonMain>
            )}
            {user && (
              <>
                <span>Xin chào {user.name || user.email}</span>
                <ButtonMain
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("token");
              }}
              color="blue"
            > 
            Đăng xuất
            </ButtonMain>
              </>
            )}
          </div>
        </div>
      </Header>
      <ModalLogin
        open={openModal}
        setOpen={setOpenModal}
        setUser={setUser}
      />

      <ShoppingCartDrawer open={cartOpen} onClose={onCloseCart} />
    </>
  );
};

export default HeaderLayout;