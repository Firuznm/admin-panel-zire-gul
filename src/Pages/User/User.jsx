import { Table } from "antd";
import { userTableBodyData } from "../../MyDatas/Data";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./User.module.scss";
import SearchAndAdd from "../../Components/SearchAndAdd/SearchAndAdd";
import { UseGlobalContext } from "../../Context/GlobalContext";
import Modal from "../../Components/Modal/Modal";

export default function User() {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width:150,
      render: (status) => (
        <span
          className={`${
            status === "Active" ? styles.activeStatus : styles.noActiveStatus
          }`}
        >
          {status}
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
      render: () => (
        <div className="icon-list">
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
    <div className={styles.userPage}>
      <SearchAndAdd addBtntext={"Add New User"} filter={false} />
      <Table
        columns={columns}
        dataSource={userTableBodyData}
        rowKey="id"
        pagination={{ pageSize: 2 }}
      />
      <Modal/>

    </div> 
  );
}
