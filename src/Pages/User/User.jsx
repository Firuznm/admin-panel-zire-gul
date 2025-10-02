// import { Table } from "antd";
// import DeleteIcon from "../../assets/Icons/DeleteIcon";
// import EditIcon from "../../assets/Icons/EditIcon";
// import styles from "./User.module.scss";
// import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
// import Modal from "../../Components/Modal/Modal";
// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import { UseGlobalContext } from "../../Context/GlobalContext";
// import ModalForEditing from "../../Components/ModalForEditing/ModalForEditing";

// export default function User() {
//   const { closeOpenModalFunc, editForModalShowHiddenFunc } = UseGlobalContext();
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const rolesData = ["Admin", "Super Admin", "Komecki Admin"];

//   const modalData = [
//     {
//       id: 1,
//       label: "Full Name",
//       name: "firstName",
//       inputType: "text",
//     },
//     {
//       id: 2,
//       label: "Last Name",
//       name: "lastName",
//       inputType: "text",
//     },
//     {
//       id: 3,
//       label: "Email",
//       name: "email",
//       inputType: "text",
//     },
//     {
//       id: 4,
//       label: "Password",
//       name: "password",
//       inputType: "password",
//     },
//     {
//       id: 5,
//       label: "Roles",
//       name: "roles",
//       inputType: "select",
//       selectData: rolesData,
//     },
//     {
//       id: 6,
//       label: "Status",
//       name: "status",
//       inputType: "switch",
//     },
//   ];

//   const { values, setValues, handleChange, handleSubmit, resetForm } =
//     useFormik({
//       initialValues: {
//         firstName: "",
//         lastName:"",
//         email: "",
//         password:"",
//         status: false,
//         roles: "",
//       },
//       enableReinitialize: true,
//       onSubmit: (formValues) => {
//         if (editUser) {
//           setUsers((prev) =>
//             prev.map((user) =>
//               user.id === editUser.id ? { ...user, ...formValues } : user
//             )
//           );
//           setEditUser(null);
//         } else {
//           const newUser = {
//             id: Date.now(),
//             ...formValues,
//           };
//           setUsers((prev) => [...prev, newUser]);
//         }
//         resetForm();
//         closeOpenModalFunc();
//       },
//     });

//   useEffect(() => {
//     if (editUser) {
//       setValues({
//         firstName: editUser.firstName || "",
//         lastName: editUser.lastName || "",
//         email: editUser.email || "",
//         status: editUser.status || false,
//         roles: editUser.roles || "",
//       });
//     }
//   }, [editUser, setValues]);

//   const columns = [
//     {
//       title: "#Id",
//       dataIndex: "id",
//       key: "id",
//       width: 60,
//     },
//     {
//       title: "Full Name",
//       key: "fullName",
//       render: (record) =>
//         `${record.firstName || ""} ${record.lastName || ""}`,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 150,
//       render: (status) => (
//         <span
//           className={`${
//             status ? styles.activeStatus : styles.noActiveStatus
//           }`}
//         >
//           {status ? "Active" : "DeActive"}
//         </span>
//       ),
//     },
//     {
//       title: "Roles",
//       dataIndex: "roles",
//       key: "roles",
//     },
//     {
//       title: "Last Login",
//       dataIndex: "lastLogin",
//       key: "lastLogin",
//     },
//     {
//       title: "Created At",
//       dataIndex: "createdAt",
//       key: "createdAt",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (record) => (
//         <div className="icon-list">
//           <span
//             onClick={() => {
//               // setEditUser(record);
//               // closeOpenModalFunc();
//               editForModalShowHiddenFunc()
//             }}
//           >
//             <EditIcon />
//           </span>
//           <span
//             onClick={() =>
//               setUsers((prev) => prev.filter((user) => user.id !== record.id))
//             }
//           >
//             <DeleteIcon />
//           </span>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className={styles.userPage}>
//       <SearchAndAdd addBtntext={"Add New User"} filter={false} />
//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         pagination={{ pageSize: 8 }}
//       />
//       <Modal
//         ModalData={modalData}
//         title={"Add New User"}
//         formik={{ values, handleChange, handleSubmit }}
//       />
//       <ModalForEditing title={"Edit for User"}/>
//     </div>
//   );
// }

import { Table } from "antd";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./User.module.scss";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalForEditing from "../../Components/ModalForEditing/ModalForEditing";
import ModalForAdd from "../../Components/ModalForAdd/ModalForAdd";
import ModalForDelete from "../../Components/ModalForDelete/ModalForDelete";

export default function User() {
  const {
    closeOpenAddModalFunc,
    editForModalShowHiddenFunc,
    deleteForModalShowHiddenFunc,
  } = UseGlobalContext();
  const [usersData, setUsersData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const rolesData = ["Admin", "Super Admin", "Komecki Admin"];

  // ilk modal acilanda formun (inputlarin) datasi
  const modalData = [
    {
      id: 1,
      label: "Full Name",
      name: "firstName",
      inputType: "text",
    },
    {
      id: 2,
      label: "Last Name",
      name: "lastName",
      inputType: "text",
    },
    {
      id: 3,
      label: "Email",
      name: "email",
      inputType: "text",
    },
    {
      id: 4,
      label: "Password",
      name: "password",
      inputType: "password",
    },
    {
      id: 5,
      label: "Roles",
      name: "roles",
      inputType: "select",
      selectData: rolesData,
    },
    {
      id: 6,
      label: "Status",
      name: "status",
      inputType: "switch",
    },
  ];

  // edit duymesine click edende acilan formun (inputlarin) datasi
  const modalForEditFormData = [
    {
      id: 1,
      label: "Full Name",
      name: "firstName",
      inputType: "text",
    },
    {
      id: 2,
      label: "Last Name",
      name: "lastName",
      inputType: "text",
    },
    {
      id: 3,
      label: "Email",
      name: "email",
      inputType: "text",
    },
    {
      id: 5,
      label: "Roles",
      name: "roles",
      inputType: "select",
      selectData: rolesData,
    },
    {
      id: 6,
      label: "Status",
      name: "status",
      inputType: "switch",
    },
  ];
  // edit duymesine click edende acilan password formun (inputlarin) datasi
  const passwordModalFormData = [
    {
      id: 1,
      label: "Password",
      name: "password",
      inputType: "password",
    },
    {
      id: 2,
      label: "Repeat Password",
      name: "repeatPassword",
      inputType: "password",
    },
  ];

  //  user elave edemek  üçün formik
  const {
    values: addValues,
    handleChange: addHandleChange,
    handleSubmit: addHandleSubmit,
    resetForm: addResetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: "",
      status: false,
    },
    onSubmit: (formValues) => {
      const newUser = { id: Date.now(), ...formValues };
      setUsersData((prev) => [...prev, newUser]);
      addResetForm();
      closeOpenAddModalFunc();
    },
  });

  // edit butonuna click edende  Edit üçün formik
  const {
    values: editValues,
    handleChange: editHandleChange,
    handleSubmit: editHandleSubmit,
    setValues: setEditValues,
    resetForm: editResetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roles: "",
      status: false,
    },
    enableReinitialize: true,
    onSubmit: (formValues) => {
      setUsersData((prev) =>
        prev.map((u) =>
          u.id === selectedUserData.id ? { ...u, ...formValues } : u
        )
      );
      editResetForm();
      setSelectedUserData(null);
      editForModalShowHiddenFunc();
    },
  });

  const {
    values: passwordValues,
    handleChange: passwordHandleChange,
    handleSubmit: passwordHandleSubmit,
    resetForm: passwordResetForm,
  } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    onSubmit: (formValues) => {
      alert(JSON.stringify(formValues, null, 2));
      passwordResetForm();
      editForModalShowHiddenFunc();
    },
  });

  // seçilən user datasini forma doldururam burda
  useEffect(() => {
    if (selectedUserData) {
      setEditValues({
        firstName: selectedUserData.firstName || "",
        lastName: selectedUserData.lastName || "",
        email: selectedUserData.email || "",
        roles: selectedUserData.roles || "",
        status: selectedUserData.status || false,
      });
    }
  }, [selectedUserData, setEditValues]);

  // hansi id li userde deyisiklik etmek islediyimizi tapiriq
  const findSelectedUserData = (id) => {
    const findSelectUser = usersData.find((user) => user.id === id);
    setSelectedUserData(findSelectUser);
  };

  const deleteTableUser = () => {
    if (deleteUserId) {
      setUsersData((prev) => prev.filter((user) => user.id !== deleteUserId));
      setDeleteUserId(null);
      deleteForModalShowHiddenFunc();
    }
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
      key: "fullName",
      render: (record) => `${record.firstName || ""} ${record.lastName || ""}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <span
          className={`${status ? styles.activeStatus : styles.noActiveStatus}`}
        >
          {status ? "Active" : "DeActive"}
        </span>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
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
              editForModalShowHiddenFunc();
              findSelectedUserData(record.id);
            }}
          >
            <EditIcon />
          </span>
          <span
            onClick={() => {
              setDeleteUserId(record.id);
              deleteForModalShowHiddenFunc();
            }}
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
        dataSource={usersData}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
      <ModalForAdd
        ModalData={modalData}
        formik={{
          values: addValues,
          handleChange: addHandleChange,
          handleSubmit: addHandleSubmit,
        }}
      />
      <ModalForEditing
        title={"Edit User"}
        modalForEditFormData={modalForEditFormData}
        formik={{
          values: editValues,
          handleChange: editHandleChange,
          handleSubmit: editHandleSubmit,
        }}
        passwordFormik={{
          values: passwordValues,
          handleChange: passwordHandleChange,
          handleSubmit: passwordHandleSubmit,
        }}
        passwordModalFormData={passwordModalFormData}
      />
      <ModalForDelete deleteTableUser={deleteTableUser} />
    </div>
  );
}

