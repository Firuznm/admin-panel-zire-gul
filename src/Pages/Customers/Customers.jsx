import { Table } from "antd";
import EditIcon from "../../assets/Icons/EditIcon";
import EyeIcon from "../../assets/Icons/EyeIcon";
import NoIcon from "../../assets/Icons/NoIcon";
import YesIcon from "../../assets/Icons/YesIcon";
import styles from "./Customers.module.scss";
import { NavLink, useSearchParams } from "react-router-dom";
import { UseGlobalContext } from "../../Context/GlobalContext";
import ModalInfoAndPassword from "../../Components/ModalInfoAndPassword/ModalInfoAndPassword";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ziraGulAdminPanel from "../../Helpers/Helpers";
import url from "../../ApiUrls/Url";
import moment from "moment";
import FilterIcon from "../../assets/Icons/FilterIcon";
import SearchIcon from "../../assets/Icons/SearchIcon";
import ArrowDownIcon from "../../assets/Icons/ArrowDownIcon";
import ArrowUpIcon from "../../assets/Icons/ArrowUpIcon";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination/Pagination";

export default function Customers() {
  const [showHiddenArea, setShowHiddenArea] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { editForModalShowHiddenFunc } = UseGlobalContext();
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [findCustomerData, setFindCustomerData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByParam = searchParams.get("sortBy") || "createdAt";
  const directionParam = searchParams.get("direction") || "ASC";
  const currentPage = Number(searchParams.get("page") || 1);

  const handleFilterArea = () => {
    setShowHiddenArea(!showHiddenArea);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const getAllCustomersData = async (page = 1) => {
    try {
      const res = await ziraGulAdminPanel
        .api()
        .get(
          `${url.customersAllData(sortByParam, directionParam)}&page=${page}`
        );
      setAllCustomersData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  //  ilk seifeye daxil olanda url-e sortBy ve deirectionu default deyerlerini yazdirib sonra customer- larin datasini getirirem sonra sortBy ve direction deyisende yeniden butun datalari getirirem
  useEffect(() => {
    const sortByParam = searchParams.get("sortBy");
    const directionParam = searchParams.get("direction");

    if (!sortByParam || !directionParam) {
      setSearchParams({ sortBy: "createdAt", direction: "ASC" });
    }
    getAllCustomersData(currentPage);
  }, [sortByParam, directionParam, currentPage]);

  // url-deki yazilan defaul deyerleri filter acilnada deyisdir
  const handleSortChange = (newSortBy, newDirection) => {
    setSearchParams({ sortBy: newSortBy, direction: newDirection });
  };

  // customer-in melumatlarini deyisdirib api-ye gonderirem
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
          .put(url.CustomersUpdate(sendData.id), sendData);
      } catch (error) {
        console.log(error);
      }

      getAllCustomersData();
      infoFormik.resetForm();
      editForModalShowHiddenFunc();
    },
  });
  // customer-in parolunu deyisib api-ye gonderirem
  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async (formValues) => {
      try {
        await ziraGulAdminPanel
          .api()
          .put(url.customerChangePassword(findCustomerData.id), formValues);
      } catch (error) {
        console.log(error);
        const backendError =
          error.response?.data?.errorMessages?.confirmNewPassword?.[0];
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi!",
          text: backendError,
          confirmButtonText: "Bağla",
        });
      }
      getAllCustomersData();
      passwordFormik.resetForm();
      editForModalShowHiddenFunc();
    },
  });

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!/^\+994/.test(value) && value !== "+994") return;
    const regex = /^\+994\d{0,9}$/; 
    if (regex.test(value) || value === "+994") {
      infoFormik.setFieldValue("phone", value);
    }
  };

  const findCustomer = (id) => {
    const selectCustomer = allCustomersData?.data?.find(
      (item) => item.id === id
    );
    setFindCustomerData(selectCustomer);
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
  }, [findCustomerData]);
  //  edit duymesine basanda acilan inputun datasi ve onun icine ona uygun gelen custemerin datasini doldururam
  const customerEditFormData = {
    infoForm: [
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
        inputType: "text",
        inpValue: infoFormik.values.phone,
        onChange: handlePhoneChange,
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
    passwordFormData: [
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
        </div>
      ),
    },
  ];

  return (
    <div className={styles.customersPage}>
      <div className="pageHeaderSearchFilterAdd">
        <label className="pageHeaderSearchInputWrapper">
          {searchValue.length > 0 ? "" : <SearchIcon />}
          <input
            className="pageHeaderSearchInput"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearch}
          />
        </label>
        <div className="pageHeaderFilterArea">
          <button onClick={handleFilterArea} className="pageHeaderFilterBtn">
            <FilterIcon /> Filter
          </button>

          {showHiddenArea && (
            <div className="pageHeaderFilterContent">
              <span
                onClick={() => handleSortChange("createdAt", "ASC")}
                className={`pageHeaderFilterType ${
                  sortByParam === "createdAt" && directionParam === "ASC"
                    ? "activeBtn"
                    : ""
                }`}
              >
                Yaranma tarixinə görə <ArrowDownIcon />
              </span>
              <span
                onClick={() => handleSortChange("createdAt", "DESC")}
                className={`pageHeaderFilterType ${
                  sortByParam === "createdAt" && directionParam === "DESC"
                    ? "activeBtn"
                    : ""
                }`}
              >
                Yaranma tarixinə görə <ArrowUpIcon />
              </span>
              <span className="pageHeaderFilterType">
                Ada görə A-Z <ArrowDownIcon />
              </span>
              <span className="pageHeaderFilterType">
                Ada görə Z-A <ArrowUpIcon />
              </span>
              <span className="pageHeaderFilterType">
                Yaşa görə <ArrowDownIcon />
              </span>
              <span className="pageHeaderFilterType">
                Yaşa görə <ArrowUpIcon />
              </span>
            </div>
          )}
        </div>
      </div>
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
      <Pagination
        func={getAllCustomersData}
        pageCountApi={allCustomersData?.meta?.totalPages}
      />
    </div>
  );
}
