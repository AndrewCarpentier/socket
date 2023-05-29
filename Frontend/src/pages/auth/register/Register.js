import styles from "./Register.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { CreateUser } from "../../../api/User";
import { useEffect, useState } from "react";

export function Register() {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const validationSchema = yup.object({
    pseudo: yup.string().required("Pseudo must be entered"),
    email: yup.string().required("Email must be entered"),
    password: yup.string().required("Password must be entered"),
    passwordConfirm: yup
      .string()
      .required("Password confirmation must be entered")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = {
    pseudo: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      if (await CreateUser(values)) {
        setRegisterSuccess(true);
      }
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div
      className={`container justify-content-center align-item-center ${styles.card}`}
    >
      {registerSuccess ? <Navigate to="/?registerSuccess=true" /> : ""}
      <form onSubmit={submit} className={`${styles.form}`}>
        <div className="d-flex">
          <label htmlFor="pseudo"></label>
          <input
            autoComplete="off"
            type="text"
            name="pseudo"
            placeholder="pseudo"
            {...register("pseudo")}
          />
        </div>
        <div className="d-flex">
          <label htmlFor="email"></label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            placeholder="email"
            {...register("email")}
          />
        </div>
        <div className="d-flex">
          <label htmlFor="password"></label>
          <input
            autoComplete="off"
            type="password"
            name="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <div className="d-flex">
          <label htmlFor="passwordConfirm"></label>
          <input
            autoComplete="off"
            type="password"
            name="passwordConfirm"
            placeholder="password confirmation"
            {...register("passwordConfirm")}
          />
        </div>
        <ul>
          {errors.pseudo && (
            <li className={`${styles.errors}`}>{errors.pseudo.message}</li>
          )}
          {errors.email && (
            <li className={`${styles.errors}`}>{errors.email.message}</li>
          )}
          {errors.password && (
            <li className={`${styles.errors}`}>{errors.password.message}</li>
          )}
          {errors.passwordConfirm && (
            <li className={`${styles.errors}`}>
              {errors.passwordConfirm.message}
            </li>
          )}
          {errors.generic && (
            <li className={`${styles.errors}`}>{errors.generic.message}</li>
          )}
        </ul>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          Register
        </button>
        <div className="d-flex justify-content-center">
          <Link to="/" className={`${styles.login}`}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
