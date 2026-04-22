import { routes, type AppRoute } from "../routes/appRoute";

export const getAdminPageTitle = (pathname: string): string => {
  const adminRoute = routes.find((r) => r.path === "/admin");
  if (!adminRoute) return "";

  const paths = pathname.replace("/admin", "").split("/").filter(Boolean);

  let currentRoutes: AppRoute[] = adminRoute.children || [];
  let title = "";

  // nếu là /admin → Dashboard
  if (paths.length === 0) {
    const dashboard = currentRoutes.find((r) => r.index);
    return dashboard?.label || "";
  }

  paths.forEach((segment) => {
    const match = currentRoutes.find((r) => r.path === segment);

    if (match) {
      if (match.label) {
        title = match.label;
      }
      currentRoutes = match.children || [];
    }
  });

  return title;
};
