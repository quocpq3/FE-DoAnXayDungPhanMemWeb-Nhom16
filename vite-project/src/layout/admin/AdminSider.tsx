import { Layout, Menu } from "antd";
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
    <>
      <Sider
        style={{
          background: "transparent",
          position: "sticky",
          top: 0,
          height: "100vh",
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
        <div className="pt-4">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            style={{ background: "transparent", border: "none" }}
          />
        </div>
      </Sider>
    </>
  );
};
export default AdminSider;
