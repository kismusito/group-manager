import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Reducers
import authReducer from "modules/auth";
import groupReducer from "modules/group";
import modalReducer from "modules/modal";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => StoreDispatch = useDispatch;
