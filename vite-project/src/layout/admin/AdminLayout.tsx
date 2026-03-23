import { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import AdminSider from "./AdminSider";
import AdminHeader from "./AdminHeader";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
