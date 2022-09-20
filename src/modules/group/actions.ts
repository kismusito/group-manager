import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { ValidationError } from "utils/types";

import { API_URL } from "utils/helpers/api-url";

import { CreateGroupDTO } from "./dto/create-group.dto";
import { DeleteGroupDTO } from "./dto/delete.group.dto";
import { UpdateGroupDTO } from "./dto/update-group.dto";
import { GroupActionResponse } from "./responses/create-group.response";

import { Group } from "./schemas/Group";
import { groupTypes } from "./types";
import { RootState } from "store";
import { MessageHandler } from "utils/enums/message-handler";
import { closeModal } from "modules/modal/actions";
import { ManageGroupDTO } from "./dto/manage-group.dto";
import { ManageGroupResponse } from "./responses/manage-group.response";

export const getGroups = createAsyncThunk<
  Group[],
  void,
  { state: RootState; rejectValue: ValidationError }
>(groupTypes.GET_GROUPS, async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.data?.token;
    if (token) {
      const request = await axios.get(`${API_URL}/group`, {
        headers: { authorization: token },
      });
      return request.data.groups;
    }

    throw thunkApi.rejectWithValue({ message: MessageHandler.INVALID_TOKEN });
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;
    if (!error.response) {
      throw err;
    }

    throw thunkApi.rejectWithValue(error.response.data);
  }
});

export const createGroup = createAsyncThunk<
  GroupActionResponse,
  CreateGroupDTO,
  { rejectValue: ValidationError; state: RootState }
>(groupTypes.CREATE_GROUP, async (body: CreateGroupDTO, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.data?.token;
    if (token) {
      const request = await axios.post(`${API_URL}/group/create`, body, {
        headers: {
          authorization: token,
        },
      });
      thunkApi.dispatch(getGroups());
      thunkApi.dispatch(closeModal());
      return request.data;
    }
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;
    if (!error.response) {
      throw err;
    }
    throw thunkApi.rejectWithValue(error.response.data);
  }
});

export const updateGroup = createAsyncThunk<
  GroupActionResponse,
  UpdateGroupDTO,
  { rejectValue: ValidationError; state: RootState }
>(
  groupTypes.UPDATE_GROUP,
  async ({ id, description, name }: UpdateGroupDTO, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.data?.token;
      if (token) {
        const request = await axios.patch(
          `${API_URL}/group/update`,
          { description, name },
          { params: { id }, headers: { authorization: token } }
        );
        thunkApi.dispatch(closeModal());
        return { ...request.data, id, description, name };
      }

      throw thunkApi.rejectWithValue({ message: MessageHandler.INVALID_TOKEN });
    } catch (err) {
      const error: AxiosError<ValidationError> = err as any;
      if (!error.response) {
        throw err;
      }
      throw thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGroup = createAsyncThunk<
  GroupActionResponse,
  DeleteGroupDTO,
  { rejectValue: ValidationError; state: RootState }
>(groupTypes.DELETE_GROUP, async ({ id }: DeleteGroupDTO, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.data?.token;
    if (token) {
      const request = await axios.delete(`${API_URL}/group/delete`, {
        params: { id },
        headers: { authorization: token },
      });
      return { ...request.data, id };
    }

    throw thunkApi.rejectWithValue({ message: MessageHandler.INVALID_TOKEN });
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;
    if (!error.response) {
      throw err;
    }
    throw thunkApi.rejectWithValue(error.response.data);
  }
});

export const managePeople = createAsyncThunk<
  ManageGroupResponse,
  ManageGroupDTO,
  { rejectValue: ValidationError; state: RootState }
>(groupTypes.MANAGE_PEOPLE, async (body: ManageGroupDTO, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.data?.token;
    if (token) {
      const request = await axios.post(
        `${API_URL}/group/manage-members`,
        body,
        {
          headers: {
            authorization: token,
          },
        }
      );
      thunkApi.dispatch(closeModal());
      return { ...request.data, id: body.groupId, newValues: body.newValues };
    }
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;
    if (!error.response) {
      throw err;
    }
    throw thunkApi.rejectWithValue(error.response.data);
  }
});

export const manageRoles = createAsyncThunk<
  ManageGroupResponse,
  ManageGroupDTO,
  { rejectValue: ValidationError; state: RootState }
>(groupTypes.MANAGE_ROLES, async (body: ManageGroupDTO, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.data?.token;
    if (token) {
      const request = await axios.post(`${API_URL}/group/manage-roles`, body, {
        headers: {
          authorization: token,
        },
      });
      thunkApi.dispatch(closeModal());
      return { ...request.data, id: body.groupId, newValues: body.newValues };
    }
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;
    if (!error.response) {
      throw err;
    }
    throw thunkApi.rejectWithValue(error.response.data);
  }
});
