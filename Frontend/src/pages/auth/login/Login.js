import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export function Login() {
  const { login } = useContext(AuthContext);

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
    <div>
      <form onSubmit={submit}>
        <input type="email" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.email && (
          <li className="error-message">{errors.email.message}</li>
        )}
        {errors.password && (
          <li className="error-message">{errors.password.message}</li>
        )}
        {errors.generic && (
          <li className="error-message">{errors.generic.message}</li>
        )}
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
