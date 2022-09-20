import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { authTypes } from "./types";
import { LoginBodyParams } from "./dto/login-body-params.dto";
import { LoginResponse } from "./responses/login-response.response";
import { ValidationError } from "utils/types";

export const login = createAsyncThunk<
  LoginResponse,
  LoginBodyParams,
  { rejectValue: ValidationError }
>(authTypes.LOGIN, async (bodyParams: LoginBodyParams, thunkApi) => {
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      bodyParams
    );
    return request.data;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkApi.rejectWithValue(error.response.data);
  }
});

export const logout = createAction(authTypes.LOGOUT);
