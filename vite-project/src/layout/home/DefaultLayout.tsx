import React from "react";
import { Layout, theme } from "antd";
import FooterLayout from "./Footer";
import HeaderLayout from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderLayout />
      <Content>
        {/* <Content style={{ padding: "0 48px" }}> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            // padding: 24,
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
