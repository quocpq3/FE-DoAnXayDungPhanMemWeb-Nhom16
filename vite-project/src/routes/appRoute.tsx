import DefaultLayout from "../layout/home/DefaultLayout";
import HomePage from "../pages/home/home";
import MenuPage from "../pages/home/menu";
import AboutPage from "../pages/home/about";
import ContactPage from "../pages/home/contact";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminDashboardPage from "../pages/admin/dashboard";
import LoginLayout from "../layout/auth";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import FoodCateGoryPage from "../pages/admin/food-category";
import FoodPage from "../pages/admin/food";
import PaymentPage from "../pages/home/order/payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faChartLine,
  faLayerGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import OrderPage from "../pages/admin/order";
import UserPage from "../pages/admin/user";
import OrderConfirmationPage from "../pages/home/order/orderconfirmation";
import RequireAdmin from "./RequireAdmin";

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
    ],
  },
  {
    path: "/order-confirmation",
    element: <OrderConfirmationPage />,
  },
  {
    path: "/payment/:id",
    element: <PaymentPage />,
  },
  {
    path: "payment",
    element: <PaymentPage />,
    label: "Thanh toán",
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
        label: "Dashboard",
        icon: <FontAwesomeIcon icon={faChartLine} />,
      },

      {
        path: "food-category",
        element: <FoodCateGoryPage />,
        label: "Loại món ăn",
        icon: <FontAwesomeIcon icon={faLayerGroup} />,
      },
      {
        path: "food",
        element: <FoodPage />,
        label: "Món ăn",
        icon: <FontAwesomeIcon icon={faPizzaSlice} />,
      },
      {
        path: "orders",
        element: <OrderPage />,
        label: "Đơn hàng",
        icon: <FontAwesomeIcon icon={faChartLine} />,
      },
      {
        path: "users",
        element: (
          <RequireAdmin>
            <UserPage />
          </RequireAdmin>
        ),
        label: "Người dùng",
        icon: <FontAwesomeIcon icon={faUser} />,
      },
    ],
  },
];

export default routes;
