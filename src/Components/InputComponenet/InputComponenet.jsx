import { Switch } from "antd";
import styles from "./InputComponenet.module.scss";
import ShowParolIcon from "../../assets/Icons/ShowParolIcon";
import { useState } from "react";
import HiddenParolIcon from "../../assets/Icons/HiddenParolIcon";
import { IMaskInput } from "react-imask";


export default function InputComponenet({inputData}) {
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);

  const funcShowHiddenPassword = () => {
    setShowHiddenPassword(!showHiddenPassword);
  };

  return (
    <div className={styles.imputWrapper}>
      {inputData.inputType !== "switch" && (
        <label htmlFor={inputData.id}>{inputData.label}</label>
      )}
      {(() => {
        if (inputData.inputType === "select") {
          return (
            <select
              name={inputData.name}
              value={inputData.inpValue}
              onChange={inputData.onChange}
              className={styles.selectInp}
            >
              <option value="" disabled>
                Seçim edin
              </option>
              {inputData?.selectData?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          );
        } else if (inputData.inputType === "password")
          return (
            <div className={styles.passwordInp}>
              <input
                name={inputData.name}
                type={`${showHiddenPassword ? "text" : "password"}`}
                value={inputData.inpValue}
                className={styles.input}
                onChange={inputData.onChange}
              />
              <span
                onClick={funcShowHiddenPassword}
                className={styles.showHiddenPasswordIcon}
              >
                {showHiddenPassword ? <HiddenParolIcon /> : <ShowParolIcon />}
              </span>
            </div>
          );
        else if (inputData.inputType === "IMaskInput") {
          return (
            <IMaskInput
              className={styles.input}
              mask="00/00/0000"
              definitions={{
                0: /[0-9]/,
              }}
              lazy={false}
              name="phone"
              value={inputData.inpValue}
              onAccept={(value) =>
                inputData.onChange({ target: { name: inputData.name, value } })
              }
            />
          );
        } else if (inputData.inputType === "switch") {
          return (
            <div className={styles.switchInput}>
              <label htmlFor={inputData.id}>{inputData.label}</label>
              <Switch
                checked={inputData.inpValue}
                onChange={(checked) =>
                  inputData.onChange({
                    target: { name: inputData.name, value: checked },
                  })
                }
              />
            </div>
          );
        } else {
          return (
            <input
              name={inputData.name}
              type={inputData.inputType}
              className={styles.input}
              value={inputData.inpValue}
              onChange={inputData.onChange}
            />
          );
        }
      })()}
    </div>
  );
}
