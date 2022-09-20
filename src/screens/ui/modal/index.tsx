import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  getModalComponent,
  getModalProps,
  getModalTitle,
  isModalOpen,
} from "modules/modal/selectors";
import { MODAL_COMPONENT } from "modules/modal/types/modal-components";
import { useAppDispatch, useAppSelector } from "store";
import { Close } from "@mui/icons-material";
import { closeModal } from "modules/modal/actions";

export const Modal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isModalOpen);
  const componentKey = useAppSelector(getModalComponent);
  const modalProps = useAppSelector(getModalProps);
  const title = useAppSelector(getModalTitle);

  const getComponent = () => {
    if (componentKey !== null) {
      const Component = MODAL_COMPONENT[componentKey];
      return <Component {...modalProps} />;
    }

    return null;
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} style={{ padding: 20 }} fullWidth>
      <DialogTitle>{title && title}</DialogTitle>
      <DialogActions
        onClick={handleCloseModal}
        style={{ position: "absolute", top: 4, right: 10 }}
      >
        <IconButton>
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent>{getComponent()}</DialogContent>
    </Dialog>
  );
};
