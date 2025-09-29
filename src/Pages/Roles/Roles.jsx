import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./Roles.module.scss";
import { Table } from "antd";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import Modal from "../../Components/Modal/Modal";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";

export default function Roles() {
  const { closeOpenModalFunc } = UseGlobalContext();
  const [roles, setRoles] = useState([]);
  const [editRoles, setEditRoles] = useState(null);


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
    name: "permis", 
    inputType: "checkbox",
    checkboxData: checkboxInputData,
  },
];


  const { values, setValues, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        permis: "",
      },
      enableReinitialize: true,
      onSubmit: (formValue) => {
        console.log("roles data", formValue);
        if (editRoles) {
          setEditRoles((prev) =>
            prev.map((role) =>
              role.id === editRoles.id ? { ...role, ...formValue } : role
            )
          );
          setEditRoles(null);
        } else {
          const newRole = {
            id: Date.now(),
            ...formValue,
          };
          setRoles((prev) => [...prev, newRole]);
        }
        resetForm();
        closeOpenModalFunc();
      },
    });

  useEffect(() => {
    if (editRoles) {
      setValues({
        title: editRoles.title,
        permis: editRoles.permis,
      });
    }
  }, [editRoles, setValues]);

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
      render: () => (
        <div className="icon-list">
          <span onClick={() => console.log("edit iconu click olundu")}>
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
      <Modal
        ModalData={modalFormData}
        title={editRoles ? "Edit Role" : "Add New Role"}
        formik={{ values, handleChange, handleSubmit }}
      />
    </div>
  );
}
