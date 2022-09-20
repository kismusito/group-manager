import { getToken } from "modules/auth/selectors";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store";

type Props = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: Props): JSX.Element => {
  const token = useAppSelector(getToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
