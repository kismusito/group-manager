import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const groupState = (state: RootState) => state.group;

export const getGroupsItems = createSelector(
  groupState,
  (state) => state.groups.items
);

export const isGroupsLoading = createSelector(
  groupState,
  (state) => state.groups.loading
);
