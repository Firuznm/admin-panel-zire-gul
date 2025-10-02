import styles from "./CustomerView.module.scss"

export default function CustomerView() {
  return (
    <div className={styles.customerViewPage}>
      <div className={styles.customerViewPageHeader}>
        <h4 className="pageTitle">Customer View</h4>
        <div className={styles.editAndDeleteBtn}>
          <span className={styles.editBtn}>Edit</span>
          <span className={styles.deleteBtn}>Delete</span>
        </div>
      </div>
    </div>
  );
}
