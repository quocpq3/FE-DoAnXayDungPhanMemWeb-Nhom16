import { useState } from "react";
import { Breadcrumb, Flex, Layout, theme, Typography, Divider } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AdminSider from "./AdminSider";
import AdminHeader from "./AdminHeader";
import { getAdminBreadcrumb } from "../../helper/getAdminBreadcrumb";
import { getAdminPageTitle } from "../../helper/getAdminPageTitle";
import { motion } from "framer-motion";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Title } = Typography;
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const breadcrumbItems = getAdminBreadcrumb(location.pathname);
  const pageTitle = getAdminPageTitle(location.pathname);
  return (
    <>
      {" "}
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout style={{ background: "#f5f5f5" }}>
          <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Content
            style={{
              margin: "20px 16px",
              padding: 24,
              minHeight: 280,
              background: "#f5f5f5",
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex vertical gap={10}>
              <Title level={4} style={{ marginBottom: 0 }}>
                {pageTitle}
              </Title>

              <Breadcrumb items={breadcrumbItems} />

              <Divider orientation="right">
                <span className="font-normal">{pageTitle}</span>
              </Divider>
            </Flex>

            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
