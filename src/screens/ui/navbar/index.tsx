import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { logout } from "modules/auth/actions";
import { getUsername } from "modules/auth/selectors";
import { useAppDispatch, useAppSelector } from "store";

export const Navbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(getUsername);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" style={{ marginBottom: 30 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {username}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
