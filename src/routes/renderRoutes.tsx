import { Route } from "react-router-dom";
import type { AppRoute } from "./appRoute";

export const renderRoutes = (routes: AppRoute[]) =>
  routes.map((route, index) => {
    if (route.index) {
      return <Route key={index} index element={route.element} />;
    }

    return (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
