import { CreateGroupForm } from "screens/form/create-group";
import { EditGroupForm } from "screens/form/edit-group";
import { ManageGroupPeople } from "screens/ui/group-people";
import { ManageGroupRoles } from "screens/ui/group-roles";

export const MODAL_COMPONENT = {
  CREATE_GROUP_FORM: CreateGroupForm,
  EDIT_GROUP_FORM: EditGroupForm,
  MANAGE_GROUP_PEOPLE: ManageGroupPeople,
  MANAGE_GROUP_ROLES: ManageGroupRoles,
};

export enum MODAL_COMPONENT_KEY {
  CREATE_GROUP = "CREATE_GROUP_FORM",
  EDIT_GROUP = "EDIT_GROUP_FORM",
  MANAGE_GROUP_PEOPLE = "MANAGE_GROUP_PEOPLE",
  MANAGE_GROUP_ROLES = "MANAGE_GROUP_ROLES",
}
