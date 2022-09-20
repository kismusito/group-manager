import { MODAL_COMPONENT_KEY } from "./modal-components";

export type ModalInitialState = {
  isOpen: boolean;
  component: MODAL_COMPONENT_KEY | null;
  props: any;
  title: string | undefined;
};
