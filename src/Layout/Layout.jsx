import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Layout.module.scss"


export default function Layout() {
  return (
      <div className={styles.layoutWrapper}>
      <Sidebar />
          <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
