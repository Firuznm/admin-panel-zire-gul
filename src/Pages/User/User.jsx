import { Table } from "antd";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./User.module.scss";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalForEditing from "../../Components/ModalForEditing/ModalForEditing";
import ModalForAdd from "../../Components/ModalForAdd/ModalForAdd";
import ziraGulAdminPanel from "../../Helpers/Helpers";
import url from "../../ApiUrls/Url";
import moment from "moment";
import Pagination from "../../Components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

export default function User() {
  const { closeOpenAddModalFunc, editForModalShowHiddenFunc } =
    UseGlobalContext();
  const [usersData, setUsersData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [userRoleDatas, setUserRoleDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const getUserRoleDatas = async () => {
    try {
      const resData = await ziraGulAdminPanel.api().get(url.getAllRoles);
      setUserRoleDatas(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsersData = async (page = 1) => {
    try {
      const resData = await ziraGulAdminPanel
        .api()
        .get(`${url.getAllUsers}?page=${page}&perPage=6`);
      setUsersData(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRoleDatas();
    getAllUsersData(currentPage);
  }, [currentPage]);

  console.log("test user data=", usersData);
  console.log("select user data,==", selectedUserData);

  // hansi id li userde deyisiklik etmek islediyimizi tapiriq
  const findSelectedUserData = (id) => {
    const findSelectUser = usersData.data.find((user) => user.id === id);
    setSelectedUserData(findSelectUser);
  };

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
      selectData: userRoleDatas.map((item) => item.title),
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
      selectData: userRoleDatas.map((item) => item.title),
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
      roles: [],
      status: false,
    },
    onSubmit: async (formValues) => {
      try {
        // burda userin roluna gore hemin rolun id-sini tapib api gonderirem
        const selectedRole = userRoleDatas.find(
          (role) => role.title === formValues.roles
        );
        const payload = {
          ...formValues,
          roleIds: selectedRole ? [selectedRole.id] : [],
          isActive: formValues.status,
        };

        await ziraGulAdminPanel.api().post(url.createUser, payload);
        getAllUsersData();
      } catch (error) {
        console.log(error);
      }
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
      roles: [],
      status: false,
    },
    enableReinitialize: true,
    onSubmit: async (formValues) => {
      try {
        const selectedRoles = userRoleDatas.filter((r) =>
          formValues.roles.includes(r.title)
        );
        const payload = {
          ...formValues,
          id: selectedUserData.id,
          roleIds: selectedRoles.map((r) => r.id),
          isActive: formValues.status,
        };
        await ziraGulAdminPanel.api().put(url.updateUser(payload.id), payload);
      } catch (error) {
        console.log(error);
      }
      getAllUsersData(currentPage);
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
        roles: selectedUserData.roles?.[0]?.title || "",
        status: selectedUserData.isActive || false,
      });
    }
  }, [selectedUserData, setEditValues]);

  const columns = [
    {
      title: "#Id",
      dataIndex: "counterId",
      key: "counterId",
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
      dataIndex: "isActive",
      key: "status",
      width: 150,
      render: (isActive) => (
        <span
          className={`${
            isActive ? styles.activeStatus : styles.noActiveStatus
          }`}
        >
          {isActive ? "Active" : "DeActive"}
        </span>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => roles.map((role) => role.title).join(", "),
    },
    {
      title: "Last Login",
      dataIndex: "lastLoginAt",
      key: "lastLoginAt",
      render: (dateString) => {
        return dateString ? moment(dateString).format("DD MMM YYYY") : "-";
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateString) => {
        return dateString ? moment(dateString).format("DD MMM YYYY") : "-";
      },
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
        </div>
      ),
    },
  ];

  return (
    <div className={styles.userPage}>
      <SearchAndAdd addBtntext={"Add New User"} filter={false} />
      <Table
        columns={columns}
        dataSource={usersData?.data}
        rowKey="id"
        pagination={false}
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
      <Pagination func={getAllUsersData} paginationData={usersData.meta} />
    </div>
  );
}
