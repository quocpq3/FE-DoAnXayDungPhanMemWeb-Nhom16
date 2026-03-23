import { createBrowserRouter } from "react-router-dom";
import DefaultLayot from "../layout/home/DefaultLayout";
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

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayot />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "user-table",
        element: <UserTable />,
      },
    ],
  },
  //admin route
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
    ],
  },
]);

export default routes;
