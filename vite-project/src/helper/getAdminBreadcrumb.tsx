import type { ReactNode } from "react";
import { routes, type AppRoute } from "../routes/appRoute";
import { HomeOutlined } from "@ant-design/icons";
export const getAdminBreadcrumb = (pathname: string) => {
  const adminRoute = routes.find((r) => r.path === "/admin");
  if (!adminRoute) return [];

  const paths = pathname.replace("/admin", "").split("/").filter(Boolean);

  const breadcrumbs: { title: ReactNode }[] = [];

  breadcrumbs.push({
    title: (
      <a href="/admin">
        <HomeOutlined />
        <span>Home</span>
      </a>
    ),
  });

  let currentRoutes: AppRoute[] = adminRoute.children || [];

  if (paths.length === 0) {
    const dashboard = currentRoutes.find((r) => r.index);
    if (dashboard?.label) {
      breadcrumbs.push({ title: dashboard.label });
    }
    return breadcrumbs;
  }

  paths.forEach((segment) => {
    const match = currentRoutes.find((r) => r.path === segment);

    if (match) {
      if (match.label) {
        breadcrumbs.push({ title: match.label });
      }
      currentRoutes = match.children || [];
    }
  });

  return breadcrumbs;
};
