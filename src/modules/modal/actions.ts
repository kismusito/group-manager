import { createAction } from "@reduxjs/toolkit";
import { modalTypes } from "./types";
import { MODAL_COMPONENT_KEY } from "./types/modal-components";

type Props = {
  component: MODAL_COMPONENT_KEY;
  title?: string;
  props: any;
};

export const openModal = createAction(modalTypes.OPEN_MODAL, (props: Props) => {
  return {
    payload: props,
  };
});

export const closeModal = createAction(modalTypes.CLOSE_MODAL);
