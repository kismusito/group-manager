import { User } from "../schemas/User";

export type LoginResponse = {
  token: string;
  user: User;
};
