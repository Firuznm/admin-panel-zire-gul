import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Customers from "./Pages/Customers/Customers";
import Roles from "./Pages/Roles/Roles";
import User from "./Pages/User/User";
import UserInfoPage from "./Pages/UserInfoPage/UserInfoPage";
import { GlobalProvider } from "./Context/GlobalContext";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "/",
        element: <User />,
      },
      {
        path: "user-info",
        element: <UserInfoPage/>,
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
