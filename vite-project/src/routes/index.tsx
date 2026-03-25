import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./renderRoutes";
import routes from "./appRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
