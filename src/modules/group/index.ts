import { createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  getGroups,
  managePeople,
  manageRoles,
  updateGroup,
} from "./actions";
import { groupPrefix } from "./types";
import { GroupInitialState } from "./types/initial-state";
import Swal from "sweetalert2";
import { logout } from "modules/auth/actions";

const initialState: GroupInitialState = {
  group: null,
  groups: {
    items: [],
    loading: false,
  },
  error: null,
};

const groupSlice = createSlice({
  name: groupPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroups.pending, (state) => {
      state.groups.loading = true;
    });
    builder.addCase(logout, (state) => {
      state.groups.loading = false;
      state.groups.items = [];
      state.error = null;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups.loading = false;
      state.groups.items = action.payload;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: action.payload.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(updateGroup.fulfilled, (state, action) => {
      const { id, description, name } = action.payload;
      state.groups.items = state.groups.items.map((group) => {
        if (group.id === id) {
          if (description) {
            group.description = description;
          }
          if (name) {
            group.name = name;
          }
          return group;
        }
        return group;
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: action.payload.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      const { message, id } = action.payload;
      state.groups.items = state.groups.items.filter(
        (group) => group.id !== id
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(managePeople.fulfilled, (state, action) => {
      const { id, newValues } = action.payload;
      state.groups.items = state.groups.items.map((group) => {
        if (group.id === id) {
          group.people = group.people.filter((person) =>
            newValues.includes(person.id)
          );
        }
        return group;
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: action.payload.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(manageRoles.fulfilled, (state, action) => {
      const { id, newValues } = action.payload;
      state.groups.items = state.groups.items.map((group) => {
        if (group.id === id) {
          group.roles = group.roles.filter((rol) => newValues.includes(rol.id));
        }
        return group;
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: action.payload.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  },
});

export default groupSlice.reducer;
