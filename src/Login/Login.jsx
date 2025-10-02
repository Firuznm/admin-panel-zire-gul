import { useFormik } from "formik";
import Input from "../Components/Input/Input";
import styles from "./Login.module.scss";
import {useNavigate } from "react-router-dom"; 
import ziraGulAdminPanel from "../Helpers/Helpers";
import url from "../ApiUrls/Url";

export default function Login() {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (formValue) => {
      try {
        const res = await  ziraGulAdminPanel.api().post(url.login, formValue)

        const data = res.data;

        if (res.status === 201 && data.access_token) {
          localStorage.setItem("token", data.access_token);

          navigate("/");
        } else {
          alert("Email və ya şifrə səhvdir!");
        }
      } catch (error) {
        console.error("Login error ===", error);
        alert("Serverə qoşulmaq alınmadı.");
      }
      resetForm();
    },
  });

  const loginFormData = [
    { id: 1, label: "Email", name: "email", inputType: "email" },
    { id: 2, label: "Password", name: "password", inputType: "password" },
  ];

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {loginFormData.map((inputData) => (
          <Input
            key={inputData.id}
            inputData={inputData}
            value={values[inputData.name]}
            onChange={handleChange}
          />
        ))}
        <button className={styles.sendBtn} type="submit">Gonder</button>
      </form>
    </div>
  );
}
