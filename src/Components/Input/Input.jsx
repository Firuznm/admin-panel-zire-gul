import { useState } from "react";
import styles from "./Input.module.scss"

export default function Input() {
  const [inpValue, setInpValue]= useState()
  const onChangeInput = (e) => {
    setInpValue(e.target.value)
  }
  return (
    <div className={styles.imputWrapper}>
      <label htmlFor="id">Firuz</label>
      <input type="text" id="id" className={styles.input} value={inpValue} onChange={onChangeInput} />
    </div>
  );
}
