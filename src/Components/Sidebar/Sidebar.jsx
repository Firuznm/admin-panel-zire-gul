import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.scss"
import { useState } from "react";
import AccessIcon from "../../assets/Icons/AccessIcon";
import UserIcon from "../../assets/Icons/UserIcon";
import RolesIcon from "../../assets/Icons/RolesIcon";
import UserActivitiesIcon from "../../assets/Icons/UserActivitiesIcon";
import DownIcon from "../../assets/Icons/DownIcon";
import CustomerIcon from "../../assets/Icons/CustomerIcon";
import CustomersIcon from "../../assets/Icons/CustomersIcon";
import CatalogIcon from "../../assets/Icons/CatalogIcon";


export default function Sidebar() {
  
  
  const [showHiddenPage, setShowHiddenPage] = useState({
    access: false,
    customer: false,
    catalog:false
  })

 const onClickShowHiddenPage = (sectionTitle) => {
   setShowHiddenPage((prev) => ({
     ...prev,
     [sectionTitle] : !prev[sectionTitle]
      }))
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div
        onClick={() => onClickShowHiddenPage("access")}
        className={styles.mainPage}
      >
        <span className={styles.iconName}>
          <AccessIcon /> Access Control
        </span>
        <span
          className={`${styles.downUpIcon} ${
            showHiddenPage.access ? styles.rotateIcon : ""
          }`}
        >
          <DownIcon />
        </span>
      </div>
      <div
        className={`${styles.pageList} ${
          showHiddenPage.access ? styles.activePageList : ""
        }`}
      >
        <NavLink
          to="user"
          className={({ isActive }) => ` ${isActive ? styles.active : ""}`}
        >
          {({ isActive }) => (
            <>
              <UserIcon color={isActive ? "rgba(66, 180, 47, 1)" : "#6A6A6A"} />
              User
            </>
          )}
        </NavLink>
        <NavLink
          to="roles"
          className={({ isActive }) => ` ${isActive ? styles.active : ""}`}
        >
          {({ isActive }) => (
            <>
              <RolesIcon
                color={isActive ? "rgba(66, 180, 47, 1)" : "#6A6A6A"}
              />
              Roles
            </>
          )}
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => ` ${isActive ? styles.active : ""}`}
        >
          <UserActivitiesIcon /> User Activities
        </NavLink>
      </div>

      <div
        onClick={() => onClickShowHiddenPage("customer")}
        className={styles.mainPage}
      >
        <span className={styles.iconName}>
          <CustomerIcon /> Customer
        </span>

        <span
          className={`${styles.downUpIcon} ${
            showHiddenPage.customer ? styles.rotateIcon : ""
          }`}
        >
          <DownIcon />
        </span>
      </div>
      <div
        className={`${styles.pageList} ${
          showHiddenPage.customer ? styles.activePageList : ""
        }`}
      >
        <NavLink
          to="customers"
          className={({ isActive }) => ` ${isActive ? styles.active : ""}`}
        >
          {({ isActive }) => (
            <>
              <CustomersIcon
                color={isActive ? "rgba(66, 180, 47, 1)" : "#6A6A6A"}
              />
              Customers
            </>
          )}
        </NavLink>
      </div>

      <div
        onClick={() => onClickShowHiddenPage("catalog")}
        className={styles.mainPage}
      >
        <span className={styles.iconName}>
          <CatalogIcon /> Catalog
        </span>
        <span
          className={`${styles.downUpIcon} ${
            showHiddenPage.catalog ? styles.rotateIcon : ""
          }`}
        >
          <DownIcon />
        </span>
      </div>
      <div
        className={`${styles.pageList} ${
          showHiddenPage.catalog ? styles.activePageList : ""
        }`}
      >
        <NavLink to="products">Products</NavLink>
        <NavLink to="categories">Categories</NavLink>
        <NavLink to="attributes">Attributes</NavLink>
      </div>
    </div>
  );
}
