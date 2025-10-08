import { Table } from "antd";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import EyeIcon from "../../assets/Icons/EyeIcon";
import NoIcon from "../../assets/Icons/NoIcon";
import YesIcon from "../../assets/Icons/YesIcon";
import styles from "./Customers.module.scss";
import { NavLink } from "react-router-dom";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalInfoAndPassword from "../../Components/ModalInfoAndPassword/ModalInfoAndPassword";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ziraGulAdminPanel from "../../Helpers/Helpers";
import url from "../../ApiUrls/Url";
import moment from "moment";

export default function Customers() {
  const { editForModalShowHiddenFunc } = UseGlobalContext();
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [findCustomerData, setFindCustomerData] = useState({})

  const getAllCustomersData = async () => {
    try {
      const resData = await ziraGulAdminPanel.api().get(url.allCustomers);
      setAllCustomersData(resData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCustomersData();
  }, []);

  const infoFormik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "",
      birthdate: "",
      isBlocked: false,
    },
    onSubmit: async (formValues) => {
      try {
        const sendData = {
          ...formValues,
          birthdate: formValues.birthdate
            ? moment(formValues.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
            : null,
          phone: String(formValues.phone),
          isBlocked: Boolean(formValues.isBlocked),
        };

        await ziraGulAdminPanel
          .api()
          .put(url.updateCustomers(sendData.id), sendData);
      } catch (error) {
        console.log(error);
      }

      getAllCustomersData();
      infoFormik.resetForm();
      editForModalShowHiddenFunc();
    },
  });

    const passwordFormik = useFormik({
      initialValues: {
        id: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      onSubmit: (formValues) => {
        alert(JSON.stringify(formValues, null, 2));
        passwordFormik.resetForm();
        editForModalShowHiddenFunc();
      },
    });

  const findCustomer = (id) => {
    const selectCustomer = allCustomersData?.data?.find(
      (item) => item.id === id
    );
    setFindCustomerData(selectCustomer)
  };
  useEffect(() => {
   if (findCustomerData) {
     infoFormik.setValues({
       id: findCustomerData.id,
       firstName: findCustomerData.firstName || "",
       lastName: findCustomerData.lastName || "",
       phone: findCustomerData.phone || "",
       email: findCustomerData.email || "",
       gender: findCustomerData.gender || "",
       birthdate: findCustomerData.birthdate
         ? moment(findCustomerData.birthdate).format("DD/MM/YYYY")
         : "",
       isBlocked: findCustomerData.isBlocked || false,
     });
   }  
  }, [findCustomerData])
  

  const customerEditFormData = {
    userInfoEditForm: [
      {
        id: 1,
        label: "First Name",
        name: "firstName",
        inputType: "text",
        inpValue: infoFormik.values.firstName,
        onChange: infoFormik.handleChange,
      },
      {
        id: 2,
        label: "Last Name",
        name: "lastName",
        inputType: "text",
        inpValue: infoFormik.values.lastName,
        onChange: infoFormik.handleChange,
      },
      {
        id: 3,
        label: "Phone",
        name: "phone",
        inputType: "number",
        inpValue: infoFormik.values.phone
          ? Number(infoFormik.values.phone)
          : undefined, //phone string geldiyi ucun Number cevirirem
        onChange: infoFormik.handleChange,
      },
      {
        id: 4,
        label: "Email",
        name: "email",
        inputType: "email",
        inpValue: infoFormik.values.email,
        onChange: infoFormik.handleChange,
      },
      {
        id: 5,
        label: "Gender",
        name: "gender",
        inputType: "select",
        selectData: ["Man", "Woman"],
        inpValue: infoFormik.values.gender,
        onChange: infoFormik.handleChange,
      },
      {
        id: 6,
        label: "Birthdate",
        name: "birthdate",
        inputType: "IMaskInput",
        inpValue: infoFormik.values.birthdate,
        onChange: infoFormik.handleChange,
      },
      {
        id: 8,
        label: "Blocked",
        name: "isBlocked",
        inputType: "switch",
        inpValue: infoFormik.values.isBlocked,
        onChange: infoFormik.handleChange,
      },
    ],
    userPasswordEditFormData: [
      {
        id: 1,
        label: "New Password",
        name: "newPassword",
        inputType: "password",
        inpValue: passwordFormik.values.newPassword,
        onChange: passwordFormik.handleChange,
      },
      {
        id: 2,
        label: "Confirm New Password",
        name: "confirmNewPassword",
        inputType: "password",
        inpValue: passwordFormik.values.confirmNewPassword,
        onChange: passwordFormik.handleChange,
      },
    ],
  };

  const columns = [
    {
      title: "#Id",
      dataIndex: "counterId",
      key: "id",
      width: 60,
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (record) => `${record.firstName || ""} ${record.lastName || ""}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 140,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "verified",
      render: (isVerified) =>
        isVerified == true ? (
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
      dataIndex: "isBlocked",
      key: "blocked",
      render: (isBlocked) =>
        isBlocked == true ? (
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
          <NavLink to="/customer-view">
            <EyeIcon />
          </NavLink>
          <span
            onClick={() => {
              editForModalShowHiddenFunc();
              findCustomer(record.id);
            }}
          >
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
      <SearchAndAdd
        addBtntext={"Add New Customers"}
        filter={true}
        addBtn={false}
      />
      <Table
        columns={columns}
        dataSource={allCustomersData?.data}
        rowKey="id"
      />
      <ModalInfoAndPassword
        openFormInputData={customerEditFormData}
        sendInfoFunc={infoFormik.handleSubmit}
        sendPasswordFunc={passwordFormik.handleSubmit}
      />
    </div>
  );
}
