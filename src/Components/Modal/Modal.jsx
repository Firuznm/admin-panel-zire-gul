import CloseIcon from "../../assets/Icons/CloseIcon";
import Input from "../Input/Input";
import styles from "./Modal.module.scss";
import { UseGlobalContext } from "../../Context/GlobalContext";
import { useEffect } from "react";

export default function Modal({ ModalData, title, formik,}) {
  const { showHiddenModal, closeOpenModalFunc } = UseGlobalContext();

  useEffect(() => {
    document.body.style.overflow = showHiddenModal ? "hidden" : "auto";
  }, [showHiddenModal]);

  return (
    <>
      {showHiddenModal && (
        <div className={styles.overlay}>
          <div className={styles.modalWrapper}>
            <span
              onClick={closeOpenModalFunc}
              className={styles.closeModalIcon}
            >
              <CloseIcon />
            </span>
            <h4 className={styles.title}>{title}</h4>

            <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
              <div className={styles.inputListWrapper}>
                {ModalData.map((item) => (
                  <Input
                    key={item.id}
                    inputData={item}
                    value={formik.values[item.name]}
                    onChange={formik.handleChange}
                  />
                ))}
              </div>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
