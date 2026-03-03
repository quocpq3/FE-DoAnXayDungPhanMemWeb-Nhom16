import { createBrowserRouter } from "react-router-dom";
import DefaultLayot from "../layout/home/DefaultLayout";
import HomePage from "../pages/home/home";
import MenuPage from "../pages/home/menu";
import AboutPage from "../pages/home/about";
import ContactPage from "../pages/home/contact";

const routes = createBrowserRouter([
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
    ],
  },
]);

export default routes;
