import { Group } from "modules/group/schemas/Group";
import { Fragment, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useAppDispatch } from "store";
import { manageRoles } from "modules/group/actions";
import { Rol } from "modules/group/schemas/Rol";

type Props = {
  group: Group;
};

export const ManageGroupRoles = ({ group }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [roles, setRoles] = useState<Rol[]>(group.roles);

  const handleRemoveRol = (id: string) => {
    setRoles(roles.filter((rol) => rol.id !== id));
  };

  const handleSavePeople = () => {
    const data = {
      groupId: group.id,
      oldValues: group.roles.map((rol) => rol.id),
      newValues: roles.map((rol) => rol.id),
    };

    dispatch(manageRoles(data));
  };

  return (
    <Fragment>
      <List>
        {roles.map((rol) => (
          <ListItem
            key={rol.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveRol(rol.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={rol.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" fullWidth onClick={handleSavePeople}>
        Save
      </Button>
    </Fragment>
  );
};
