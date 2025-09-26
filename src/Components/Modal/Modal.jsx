import CloseIcon from "../../assets/Icons/CloseIcon";
import Input from "../Input/Input";
import styles from "./Modal.module.scss";
import { UseGlobalContext } from "../../Context/GlobalContext";
import { useEffect } from "react";

export default function Modal() {
    const { showHiddenModal, closeOpenModalFunc } = UseGlobalContext();

    useEffect(() => {
        if (showHiddenModal) {
           document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto" 
       }
    },[showHiddenModal])

    return (
        <>
            {showHiddenModal &&
                <div className={styles.overlay}>
                    <div
                        className={`${styles.modalWrapper} ${showHiddenModal ? "" : styles.closeModal
                            }`}
                    >
                        <span
                            onClick={closeOpenModalFunc}
                            className={styles.closeModalIcon}
                        >
                            <CloseIcon />
                        </span>
                        <h4 className={styles.title}>Add New User</h4>

                        <form className={styles.formWrapper}>
                            <div className={styles.inputListWrapper}>
                                <Input />
                                <Input />
                                <Input />
                                <Input />
                            </div>
                            <button className={styles.saveBtn}>Save</button>
                        </form>
                    </div>
                </div>}
      </>
    );
}
