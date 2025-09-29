import { Table } from "antd";
// import { userTableBodyData } from "../../MyDatas/Data";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./User.module.scss";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import Modal from "../../Components/Modal/Modal";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";

export default function User() {

  const {closeOpenModalFunc } = UseGlobalContext();
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
 
    const rolesData = ["Admin", "Super Admin", "Komecki Admin"]

    const modalData = [
    {
      id: 1,
      label: "Full Name",
      name: "Full Name",
      inputType: "text",
    },
    {
      id: 2,
      label: "Email",
      name: "Email",
      inputType: "text",
    },
    {
      id: 3,
      label: "Status",
      name: "Status",
      inputType: "switch",
    },
    {
      id: 4,
      label: "Roles",
      name: "Roles",
      inputType: "select",
      selectData: rolesData,
      },
      {
      id:5
    }
  ];

   const { values, setValues, handleChange, handleSubmit, resetForm } =  useFormik({
       initialValues: {
         ["Full Name"]: "",
         Email: "",
         Status: "Inactive",
         Roles: "",
       },
       enableReinitialize: true,
       onSubmit: (formValues) => {
         if (editUser) {
           setUsers((prev) =>
             prev.map((user) =>
               user.id === editUser.id ? { ...user, ...formValues } : user
             )
           );
           setEditUser(null);
         } else {
           const newUser = {
             id: Date.now(),
             ...formValues,
           };
           setUsers((prev) => [...prev, newUser]);
         }
         resetForm();
         closeOpenModalFunc();
       },
     });

useEffect(() => {
  if (editUser) {
    setValues({
      ["Full Name"]: editUser["Full Name"],
      Email: editUser.Email,
      Status:editUser.status,
      Roles: editUser.Roles,
    });
  }
}, [editUser, setValues]);

  const columns = [
    {
      title: "#Id",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Full Name",
      dataIndex: "Full Name",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      width: 150,
      render: (status) => (
        <span
          className={`${
            status === "Active" ? styles.activeStatus : styles.noActiveStatus
          }`}
        >
          {status ? "Active" : "DeActive"}
        </span>
      ),
    },
    {
      title: "Roles",
      dataIndex: "Roles",
      key: "roles",
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
      render: (record) => (
        <div className="icon-list">
          <span
            onClick={() => {
              setEditUser(record);
              closeOpenModalFunc();
            }}
          >
            <EditIcon />
          </span>
          <span
            onClick={() =>
              setUsers((prev) => prev.filter((user) => user.id !== record.id))
            }
          >
            <DeleteIcon />
          </span>
        </div>
      ),
    },
  ]; 



  return (
    <div className={styles.userPage}>
      <SearchAndAdd addBtntext={"Add New User"} filter={false} />
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
      <Modal
        ModalData={modalData}
        title={editUser ? "Edit User" : "Add New User"}
        formik={{ values, handleChange, handleSubmit }}
      />
    </div>
  );
}
