import * as yup from "yup";

export const createGroupResolver = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    id: yup.string().required(),
  })
  .required();
