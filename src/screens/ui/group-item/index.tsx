import { Group } from "modules/group/schemas/Group";

import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import {
  Edit,
  Delete,
  Group as GroupIcon,
  RecentActors,
} from "@mui/icons-material";
import { cutSentence } from "utils/helpers/cut-sentence";
import { GroupActionButton } from "../button/group-action-button";
import { useAppDispatch } from "store";
import Swal from "sweetalert2";
import { deleteGroup } from "modules/group/actions";
import { MODAL_COMPONENT_KEY } from "modules/modal/types/modal-components";
import { openModal } from "modules/modal/actions";

type Props = {
  group: Group;
};

export const GroupItem = ({ group }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleDeleteGroup = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGroup({ id: group.id }));
      }
    });
  };

  const handleEditGroup = () => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.EDIT_GROUP,
        title: `Edit group: ${group.name}`,
        props: {
          id: group.id,
          name: group.name,
          description: group.description,
        },
      })
    );
  };

  const handleManageGroupPeople = () => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.MANAGE_GROUP_PEOPLE,
        title: "Manage group people",
        props: {
          group,
        },
      })
    );
  };

  const handleManageGroupRoles = () => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.MANAGE_GROUP_ROLES,
        title: "Manage group roles",
        props: {
          group,
        },
      })
    );
  };

  return (
    <TableRow>
      <TableCell>{group.name}</TableCell>
      <TableCell>
        {cutSentence({
          sentence: group.description,
          totalWords: 120,
        })}
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <GroupActionButton
            title="People"
            action={handleManageGroupPeople}
            icon={<GroupIcon />}
          />
          <GroupActionButton
            title="Groups"
            action={handleManageGroupRoles}
            icon={<RecentActors />}
          />
          <GroupActionButton
            title="Edit"
            action={handleEditGroup}
            icon={<Edit />}
          />
          <GroupActionButton
            title="Delete"
            action={handleDeleteGroup}
            icon={<Delete />}
          />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};
