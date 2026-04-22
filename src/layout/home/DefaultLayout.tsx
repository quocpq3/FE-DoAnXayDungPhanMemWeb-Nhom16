import React from "react";
import { Layout, theme } from "antd";
import FooterLayout from "./Footer";
import HeaderLayout from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

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
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default App;
