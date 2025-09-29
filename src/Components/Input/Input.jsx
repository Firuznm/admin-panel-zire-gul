import { Switch } from "antd";
import styles from "./Input.module.scss";

export default function Input({ inputData, value, onChange }) {
  return (
    <div className={styles.imputWrapper}>
      <label htmlFor={inputData.id}>{inputData.label}</label>
      {(() => {
        if (inputData.inputType === "select") {
          return (
            <select
              name={inputData.name}
              value={value}
              onChange={onChange}
              className={styles.selectInp}
            >
              {inputData?.selectData?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
        else if (inputData.inputType === "checkbox") {
          return inputData.checkboxData.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={inputData.name}
                value={item}
                onChange={onChange}
              />
              {item}
            </label>
          ));
        }
        else if (inputData.inputType === "switch") {
          return (
            <Switch
              checked={value === "Active"}
              onChange={(checked) =>
                onChange({
                  target: {
                    name: inputData.name,
                    value: checked ? "Active" : "Inactive",
                  },
                })
              }
            />
          );
        } else {
          return (
            <input
              name={inputData.name}
              type={inputData.inputType}
              className={styles.input}
              value={value}
              onChange={onChange}
            />
          );
        }
      })()}
    </div>
  );
}
