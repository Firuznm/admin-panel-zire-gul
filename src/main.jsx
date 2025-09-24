import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header/Header";
import Layout from "./Layout/Layout";
import Customers from "./Pages/Customers/Customers";
import Roles from "./Pages/Roles/Roles";
import User from "./Pages/User/User";
import UserInfoPage from "./Pages/UserInfoPage/UserInfoPage";



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
        path: "user",
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
    <RouterProvider router={router} />
);
