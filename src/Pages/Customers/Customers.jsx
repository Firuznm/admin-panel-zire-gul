import { Table } from "antd";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import EyeIcon from "../../assets/Icons/EyeIcon";
import NoIcon from "../../assets/Icons/NoIcon";
import YesIcon from "../../assets/Icons/YesIcon";
import { CustomersTableBodyData } from "../../MyDatas/Data";
import styles from "./Customers.module.scss"
import { NavLink } from "react-router-dom";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { UseGlobalContext } from "../../Context/GlobalContext";
import Modal from "../../Components/Modal/Modal";

export default function Customers() {
    
  const {closeOpenModalFunc} = UseGlobalContext()

     const columns = [
       {
         title: "#Id",
         dataIndex: "id",
         key: "id",
         width: 60,
       },
       {
         title: "Full Name",
         dataIndex: "fullName",
         key: "fullName",
       },
       {
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
         width: 125,
       },
       {
         title: "Email",
         dataIndex: "email",
         key: "email",
         ellipsis: true,
       },
       {
         title: "Gender",
         dataIndex: "gender",
         key: "gender",
       },
       {
         title: "Verified",
         dataIndex: "verified",
         key: "verified",
         //  width: 90,
         render: (value) =>
           value === "yes" ? (
             <span className="yes-icon">
               <YesIcon />
               Yes
             </span>
           ) : (
             <span className="no-icon">
               <NoIcon />
               No
             </span>
           ),
       },
       {
         title: "Blocked",
         dataIndex: "blocked",
         key: "blocked",
         //  width: 90,
         render: (value) =>
           value === "yes" ? (
             <span className="yes-icon">
               <YesIcon />
               Yes
             </span>
           ) : (
             <span className="no-icon">
               <NoIcon />
               No
             </span>
           ),
       },
       {
         title: "Last Login",
         dataIndex: "lastLogin",
         key: "lastLogin",
       },
       {
         title: "Created At",
         dataIndex: "createdAt",
         key: "createdAt",
       },
       {
         title: "Actions",
         key: "actions",
         render: () => (
           <div className="icon-list">
             <NavLink to="/user-info">
               <EyeIcon />
             </NavLink>
             <span onClick={closeOpenModalFunc}>
               <EditIcon />
             </span>
             <span onClick={() => console.log("delete basildi !!!")}>
               <DeleteIcon />
             </span>
           </div>
         ),
       },
     ];
  return (
    <div className={styles.customersPage}>
      <SearchAndAdd addBtntext={"Add New Customers"} filter={true} />
      <Table
        columns={columns}
        dataSource={CustomersTableBodyData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal/>
    </div>
  );
}
