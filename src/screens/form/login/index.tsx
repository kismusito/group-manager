import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";

import { TextField, FormControl, Button } from "@mui/material";
import { FormHelperText } from "@mui/material";

import { loginFormSchema } from "./validations";
import { LoginInputs } from "./types/login-form.types";
import { useAppDispatch, useAppSelector } from "store";

import { login } from "modules/auth/actions";
import { getAuthFormError, getToken } from "modules/auth/selectors";
import { useEffect } from "react";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const formError = useAppSelector(getAuthFormError);
  const token = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginFormSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    dispatch(login(data));
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField type="email" {...register("email")} label="Email" />
        {errors.email && (
          <FormHelperText error>{errors.email?.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField type="password" {...register("password")} label="Password" />
        {errors.password && (
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        )}
      </FormControl>

      {formError && <FormHelperText error>{formError}</FormHelperText>}

      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={Object.keys(errors).length > 0}
      >
        Login
      </Button>
    </form>
  );
};
