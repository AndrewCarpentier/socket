import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { CreateUser } from "../../../api/User";
import { useState } from "react";

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
    if (!await CreateUser(values)) {
      setRegisterSuccess(true);
    }
  });

  return (
    <div>
      {registerSuccess ? <Navigate to="/?registerSuccess=true" /> : ""}
      <form onSubmit={submit}>
        <input type="text" placeholder="pseudo" {...register("pseudo")} />
        <input type="email" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="password confirmation"
          {...register("passwordConfirm")}
        />
        <ul>
          {errors.pseudo && <li>{errors.pseudo.message}</li>}
          {errors.email && <li>{errors.email.message}</li>}
          {errors.password && <li>{errors.password.message}</li>}
          {errors.passwordConfirm && <li>{errors.passwordConfirm.message}</li>}
        </ul>
        <button type="submit" disabled={isSubmitting}>
          Register
        </button>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
}
