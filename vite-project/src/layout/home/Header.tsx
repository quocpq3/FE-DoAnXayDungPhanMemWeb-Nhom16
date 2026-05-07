import { Button, Badge, Layout, Menu } from "antd";
import ButtonMain from "../../components/buttons/Button";
import Logo from "../../components/logo/Logo";
import { ShoppingOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const [user, setUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onStorageChange = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const genderMenuItems = (routes: AppRoute[]) => {
    return routes
      .filter((route) => route.label)
      .map((route) => {
        const path = route.index ? "/" : `/${route.path}`;

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

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </div>

          <Menu
            className="font-semibold"
            mode="horizontal"
            theme="light"
            selectedKeys={[location.pathname]}
            items={items}
            style={{
              borderBottom: "none",
              justifyContent: "center",
              minWidth: "max-content",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 12,
            }}
          >
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

            {!user ? (
              <ButtonMain
                onClick={() => setOpenModal(true)}
                color="danger"
              >
                Đăng nhập
              </ButtonMain>
            ) : (
              <>
                <span
                  style={{
                    maxWidth: 140,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 500,
                  }}
                >
                  Xin chào {user.name || user.email}
                </span>

                <ButtonMain
                  onClick={handleLogout}
                  color="primary"
                  variant="outlined"
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

      <ShoppingCartDrawer
        open={cartOpen}
        onClose={onCloseCart}
      />
    </>
  );
};

export default HeaderLayout;