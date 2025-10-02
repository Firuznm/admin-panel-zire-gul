import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./Roles.module.scss";
import { Table } from "antd";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalAdd from "../../Components/ModalAdd/ModalAdd";

export default function Roles() {
  const { closeOpenAddModalFunc} = UseGlobalContext();
  const [roles, setRoles] = useState([]);
  const [selectRoles, setSelectRoles] = useState(null);

  const selectInputData = ["test 1", "test 2", "test 3", "test 4"];
  const checkboxInputData = ["firuz 1", "firuz 2", "firuz 3", "firuz 4"];

const modalFormData = [
  {
    id: 1,
    label: "Title",
    name: "title",
    inputType: "select",
    selectData: selectInputData,
  },
  {
    id: 2,
    label: "Permissions",
    name: "permissionIds",
    inputType: "checkbox",
    checkboxData: checkboxInputData,
  },
];

  const { values,setValues, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        permissionIds: [],
      },
      enableReinitialize: true,
      onSubmit: (formValue) => {
        if (selectRoles) {
         setRoles((prev) =>
           prev.map((role) =>
             role.id === selectRoles.id ? { ...role, ...formValue } : role
           )
         );
         setSelectRoles(null);
        } else {
           const newRole = {
             id: Date.now(),
             ...formValue,
           };
           setRoles((prev) => [...prev, newRole]);
      }
        resetForm();
        closeOpenAddModalFunc();
      },
    });

  const findSelectRole = (id) => {
    const findRole = roles.find(role => role.id === id);
    setSelectRoles(findRole)
    }
  
  useEffect(() => {
    if (selectRoles) {
      setValues({
        title: selectRoles.title || "",
        permissionIds: selectRoles.permissionIds || []
      });
  }
},[selectRoles,setValues])
  

  const columns = [
    {
      title: "#Id",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      width: 20,
      render: (record) => (
        <div className="icon-list">
          <span onClick={() => {closeOpenAddModalFunc(),findSelectRole(record.id)}}>
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
    <div className={styles.rulesPage}>
      <SearchAndAdd addBtntext={"Add New User"} filter={false} />

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
      <ModalAdd
        ModalData={modalFormData}
        formik={{ values, handleChange, handleSubmit }}
        title={selectRoles ? "Edit Roles" : "Add Roles"}
      />
    </div>
  );
}
