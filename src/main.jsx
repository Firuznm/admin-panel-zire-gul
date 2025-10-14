import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Customers from "./Pages/Customers/Customers";
import Roles from "./Pages/Roles/Roles";
import User from "./Pages/User/User";
import { GlobalProvider } from "./Context/GlobalContext";
import CustomerView from "./Pages/CustomerView/CustomerView";
import Login from "./Login/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <User />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customer-view",
        element: <CustomerView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </ConfigProvider>
);
