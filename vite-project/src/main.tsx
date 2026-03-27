import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { ProConfigProvider, viVNIntl } from "@ant-design/pro-components";
import { App as AntdApp } from "antd";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#ff4d4f",
          borderRadius: 8,
        },
        components: {
          Layout: {
            siderBg: "#fff",
            headerBg: "#fff",
          },
        },
      }}
    >
      <ProConfigProvider intl={viVNIntl}>
        <AntdApp>
          <App />
        </AntdApp>
      </ProConfigProvider>
    </ConfigProvider>
  </StrictMode>,
);
