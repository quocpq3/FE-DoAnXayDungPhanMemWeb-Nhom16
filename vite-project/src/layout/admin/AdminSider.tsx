import { Layout, Menu, ConfigProvider } from "antd"; // Thêm ConfigProvider
import Logo from "../../components/logo/Logo";
import routes from "../../routes/appRoute";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

interface AdminSiderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminSider: React.FC<AdminSiderProps> = ({ collapsed }) => {
  const location = useLocation();
  const adminRoute = routes.find((r) => r.path === "/admin");

  const items = adminRoute?.children?.map((route) => {
    const path = route.index ? "/admin" : `/admin/${route.path}`;
    return {
      key: path,
      label: <NavLink to={path}>{route.label}</NavLink>,
      icon: route.icon,
    };
  });

  return (
    <Sider
      theme="light"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        borderRight: "1px solid #f0f0f0",
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
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

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "#fff1f0",
              itemSelectedColor: "#ff4d4f",
              itemHoverColor: "#ff4d4f",
              itemActiveBg: "#fff1f0",
              itemColor: "#696969",
              iconSize: 18,
            },
          },
        }}
      >
        <div className="pt-4">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            style={{
              border: "none",
            }}
          />
        </div>
      </ConfigProvider>
    </Sider>
  );
};

export default AdminSider;
