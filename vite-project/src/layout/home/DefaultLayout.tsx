import React from "react";
import { Layout, theme } from "antd";
import FooterLayout from "./Footer";
import HeaderLayout from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderLayout />
      <Content style={{ marginTop: "64px" }}>
        {/* <Content style={{ padding: "0 48px" }}> */}
        <div
          style={{
            background: "#F8FAFC",
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default App;
