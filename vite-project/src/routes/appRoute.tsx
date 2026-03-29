import DefaultLayout from "../layout/home/DefaultLayout";
import HomePage from "../pages/home/home";
import MenuPage from "../pages/home/menu";
import AboutPage from "../pages/home/about";
import ContactPage from "../pages/home/contact";
import UserTable from "../pages/home/user";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminDashboardPage from "../pages/admin/dashboard";
import LoginLayout from "../layout/auth";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import FoodCateGoryPage from "../pages/admin/food-category";
import { DashboardOutlined, AppstoreAddOutlined } from "@ant-design/icons";

export interface AppRoute {
  path?: string;
  label?: string;
  element?: React.ReactNode;
  children?: AppRoute[];
  index?: boolean;
  icon?: React.ReactNode;
}

export const routes: AppRoute[] = [
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        label: "Đăng nhập",
      },
      {
        path: "register",
        element: <RegisterPage />,
        label: "Đăng ký",
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        label: "Trang chủ",
      },
      {
        path: "menu",
        element: <MenuPage />,
        label: "Menu",
      },
      {
        path: "about",
        element: <AboutPage />,
        label: "Giới thiệu",
      },
      {
        path: "contact",
        element: <ContactPage />,
        label: "Liên hệ",
      },
      // {
      //   path: "user-table",
      //   element: <UserTable />,
      //   label: "User Table",
      // },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
        label: "Dashboard",
        icon: <DashboardOutlined />,
      },
      {
        path: "food-category",
        element: <FoodCateGoryPage />,
        label: "Loại món ăn",
        icon: <AppstoreAddOutlined />,
      },
    ],
  },
];

export default routes;
