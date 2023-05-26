import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export function Login() {
  const { login } = useContext(AuthContext);
  const registerSuccess = new URLSearchParams(window.location.search).get(
    "registerSuccess"
  );

  const validationSchema = yup.object({
    email: yup.string().required("Email must be entered"),
    password: yup.string().required("Password must be entered"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      await login(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div
      className={`container justify-content-center align-item-center ${styles.card}`}
    >
      {registerSuccess ? <div>Vous êtes bien inscrit</div> : ""}
      <form onSubmit={submit} className={`${styles.form}`}>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            autoComplete="off"
            name="email"
            placeholder="email"
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <ul>
          {errors.email && (
            <li className={`${styles.errors}`}>{errors.email.message}</li>
          )}
          {errors.password && (
            <li className={`${styles.errors}`}>{errors.password.message}</li>
          )}
          {errors.generic && (
            <li className={`${styles.errors}`}>{errors.generic.message}</li>
          )}
        </ul>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Login
        </button>
        <div className="d-flex justify-content-center">
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
