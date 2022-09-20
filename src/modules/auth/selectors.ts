import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const authState = (state: RootState) => state.auth;

export const getToken = createSelector(authState, (state) => state.data?.token);

export const getAuthFormError = createSelector(
  authState,
  (state) => state.error
);

export const getUsername = createSelector(
  authState,
  (state) => state.data?.user.name
);
