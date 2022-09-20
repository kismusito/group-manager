import { createSlice } from "@reduxjs/toolkit";
import { closeModal, openModal } from "./actions";
import { modalPrefix } from "./types";
import { ModalInitialState } from "./types/initial-state";

const initialState: ModalInitialState = {
  isOpen: false,
  component: null,
  title: undefined,
  props: {},
};

const modalSlice = createSlice({
  name: modalPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openModal, (state, action) => {
      state.isOpen = true;
      state.component = action.payload.component;
      state.title = action.payload.title;
      state.props = action.payload.props;
    });
    builder.addCase(closeModal, (state) => {
      state.isOpen = false;
      state.component = null;
      state.props = {};
    });
  },
});

export default modalSlice.reducer;
