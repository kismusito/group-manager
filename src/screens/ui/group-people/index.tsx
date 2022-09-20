import { Group } from "modules/group/schemas/Group";
import { Fragment, useState } from "react";
import { Person } from "modules/group/schemas/Person";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useAppDispatch } from "store";
import { managePeople } from "modules/group/actions";

type Props = {
  group: Group;
};

export const ManageGroupPeople = ({ group }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [people, setPeople] = useState<Person[]>(group.people);

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  const handleSavePeople = () => {
    const data = {
      groupId: group.id,
      oldValues: group.people.map((person) => person.id),
      newValues: people.map((person) => person.id),
    };

    dispatch(managePeople(data));
  };

  return (
    <Fragment>
      <List>
        {people.map((person) => (
          <ListItem
            key={person.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemovePerson(person.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={person.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" fullWidth onClick={handleSavePeople}>
        Save
      </Button>
    </Fragment>
  );
};
