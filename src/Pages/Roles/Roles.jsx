import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./Roles.module.scss";
import { Table } from "antd";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalAdd from "../../Components/ModalAdd/ModalAdd";
import ziraGulAdminPanel from "../../Helpers/Helpers";
import url from "../../ApiUrls/Url";

export default function Roles() {
  const { closeOpenAddModalFunc } = UseGlobalContext();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectAndCheckboxInpData, setSelectAndCheckboxInpData] = useState({});

  const getInputsData = async () => {
    try {
      const resData = await ziraGulAdminPanel.api().get(url.rolesInputData);
      setSelectAndCheckboxInpData(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRoles = async () => {
    try {
      const resData = await ziraGulAdminPanel.api().get(url.getAllRoles);
      setRoles(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInputsData();
    getAllRoles();
  }, []);

  const modalFormData = [
    {
      id: 1,
      label: "Title",
      name: "title",
      inputType: "select",
      selectData: selectAndCheckboxInpData?.roles,
    },
    {
      id: 2,
      label: "Permissions",
      name: "permissions",
      inputType: "checkbox",
      checkboxData: selectAndCheckboxInpData?.permissions,
    },
  ];

  const { values, setValues, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        permissions: [],
      },
      enableReinitialize: true,
      onSubmit: async (formValue) => {
        try {
          if (selectedRole) {
            await ziraGulAdminPanel
              .api()
              .put(url.roleUpdate(selectedRole.id), formValue);
          } else {
            await ziraGulAdminPanel.api().post(url.roleCreate, formValue);
          }
          await getAllRoles();
          resetForm();
          setSelectedRole(null);
          closeOpenAddModalFunc();
        } catch (error) {
          console.log(error);
        }
      },
    });

  const findSelectedRole = (id) => {
    const findRole = roles.find((role) => role.id === id);
    findRole.permissions = findRole.permissions.map((p) => p.title);
    setSelectedRole(findRole);
  };

  useEffect(() => {
    if (selectedRole) {
      setValues({
        title: selectedRole.title || "",
        permissions: selectedRole.permissions || [],
      });
    }
  }, [selectedRole, setValues]);

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
          <span
            onClick={() => {
              closeOpenAddModalFunc(), findSelectedRole(record.id);
            }}
          >
            <EditIcon />
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
        pagination={{ pageSize: 5 }}
      />
      <ModalAdd
        ModalData={modalFormData}
        formik={{ values, handleChange, handleSubmit }}
        title={selectedRole ? "Edit Roles" : "Add Roles"}
        gridTempCol={"1fr"}
      />
    </div>
  );
}
