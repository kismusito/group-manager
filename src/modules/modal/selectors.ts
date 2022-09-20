import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const modalState = (state: RootState) => state.modal;

export const isModalOpen = createSelector(modalState, (state) => state.isOpen);
export const getModalComponent = createSelector(
  modalState,
  (state) => state.component
);
export const getModalProps = createSelector(modalState, (state) => state.props);
export const getModalTitle = createSelector(modalState, (state) => state.title);
