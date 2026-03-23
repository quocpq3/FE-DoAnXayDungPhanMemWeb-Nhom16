import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
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
      <App />
    </ConfigProvider>
  </StrictMode>,
);
