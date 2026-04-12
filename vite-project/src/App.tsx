import "./App.css";
import "animate.css";
import AppRoutes from "./routes";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "./context/themeContext";
function App() {
  return (
    <ThemeProvider>
      <ThemeApp />
    </ThemeProvider>
  );
}

function ThemeApp() {
  const { isDark } = useTheme();
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: isDark
            ? {
                colorBgBase: "#121212",
              }
            : {
                colorBgBase: "#f5f5f5",
              },
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </>
  );
}

export default App;
