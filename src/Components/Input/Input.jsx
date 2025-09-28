import styles from "./Input.module.scss"

export default function Input({ inputData, value, onChange }) {
  return (
    <div className={styles.imputWrapper}>
      <label htmlFor={inputData.id}>{inputData.label}</label>
      {inputData.inputType === "select" ? (
        <select name={inputData.name} value={value} onChange={onChange} className={styles.selectInp}>
          {inputData?.selectData?.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={inputData.name}
          type={inputData.inputType}
          className={styles.input}
            value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
