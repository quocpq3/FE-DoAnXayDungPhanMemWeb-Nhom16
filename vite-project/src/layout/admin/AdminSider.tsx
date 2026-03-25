import { Layout, Menu } from "antd";
import Logo from "../../components/logo/Logo";
import routes from "../../routes/appRoute";
import { NavLink } from "react-router-dom";
const { Sider } = Layout;
interface AdminSiderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const AdminSider: React.FC<AdminSiderProps> = ({ collapsed }) => {
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
      <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
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
          <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
        </div>
      </Sider>
    </>
  );
};
export default AdminSider;
