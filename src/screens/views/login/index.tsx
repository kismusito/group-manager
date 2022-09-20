import { Typography } from "@mui/material";
import { LoginForm } from "screens/form/login";
import { WrapperAbsoluteCenter } from "screens/styled/wrapper-center";

export const Login = () => {
  return (
    <WrapperAbsoluteCenter>
      <Typography variant="h5" mb={4}>
        Welcome again
      </Typography>
      <LoginForm />
    </WrapperAbsoluteCenter>
  );
};
