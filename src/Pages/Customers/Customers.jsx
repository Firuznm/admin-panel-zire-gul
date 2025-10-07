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
import ModalInfoAndPassword from "../../Components/ModalInfoAndPassword/ModalInfoAndPassword";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ziraGulAdminPanel from "../../Helpers/Helpers";
import url from "../../ApiUrls/Url";

export default function Customers() {
    
  const { editForModalShowHiddenFunc } = UseGlobalContext();
  const [allCustomersData, setAllCustomersData] = useState([]);

  const getAllCustomersData = async () => {
    try {
      const resData = await ziraGulAdminPanel.api().get(url.allCustomers);
      setAllCustomersData(resData.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCustomersData()  
  }, [])
  console.log("all custemers data=",allCustomersData);
  
   const { values, handleChange, handleSubmit, resetForm } = useFormik({
     initialValues: {
       firstName: "",
       lastName: "",
       phone: "",
       email: "",
       gender: "",
       birthdate: "",
       blocked: false,
     },
     onSubmit: (formValues) => {
       alert(JSON.stringify(formValues, null, 2));
       resetForm();
       editForModalShowHiddenFunc();
     },
   });
  
  const customerEditFormData = {
    userInfoEditForm: [
      {
        id: 1,
        label: "First Name",
        name: "firstName",
        inputType: "text",
        inpValue: values.lastName,
        onChange: handleChange,
      },
      {
        id: 2,
        label: "Last Name",
        name: "lastName",
        inputType: "text",
        inpValue: values.lastName,
        onChange: handleChange,
      },
      {
        id: 3,
        label: "Phone",
        name: "phone",
        inputType: "number",
        inpValue: values.phone,
        onChange: handleChange,
      },
      {
        id: 4,
        label: "Email",
        name: "email",
        inputType: "email",
        inpValue: values.email,
        onChange: handleChange,
      },
      {
        id: 5,
        label: "Gender",
        name: "gender",
        inputType: "select",
        selectData: ["Female", "Male"],
        inpValue: values.gender,
        onChange: handleChange,
      },
      {
        id: 6,
        label: "Birthdate",
        name: "birthdate",
        inputType: "date",
        inpValue: values.birthdate,
        onChange: handleChange,
      },
      {
        id: 8,
        label: "Blocked",
        name: "blocked",
        inputType: "switch",
        inpValue: values.blocked,
        onChange: handleChange,
      },
    ],
    userPasswordEditFormData: [
      {
        id: 1,
        label: "Password",
        name: "password",
      },
      {
        id: 2,
        label: "Repeat Password",
        name: "repeatPassword",
      },
    ],
  };

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
             <NavLink to="/customer-view">
               <EyeIcon />
             </NavLink>
             <span onClick={editForModalShowHiddenFunc}>
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
      <SearchAndAdd addBtntext={"Add New Customers"} filter={true} addBtn = {false} />
      <Table
        columns={columns}
        dataSource={CustomersTableBodyData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <ModalInfoAndPassword openFormInputData={customerEditFormData} sendFunc = {handleSubmit} />
    </div>
  );
}
