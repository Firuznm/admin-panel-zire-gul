import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import styles from "./Roles.module.scss"
import { RolesTableData } from "../../MyDatas/Data";
import { Table } from "antd";

export default function Roles() {

  const columns = [
    {
      title: "#Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Actions",
      key: "actions",
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
      <h4 className="test">Adminlerin rolunun verilmesi seifesi</h4>

      <Table
        columns={columns}
        dataSource={RolesTableData}
        rowKey="id"
        pagination={{pageSize:3}}
      />
    </div>
  );
}
