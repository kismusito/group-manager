import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./actions";
import { authPrefix } from "./types";
import { AuthInitialState } from "./types/initial-state.type";

const initialState: AuthInitialState = {
  loading: false,
  data: null,
  error: undefined,
};

const authSlice = createSlice({
  name: authPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(logout, (state) => {
      state.loading = false;
      state.data = null;
      state.error = undefined;
    });
  },
});

export default authSlice.reducer;
