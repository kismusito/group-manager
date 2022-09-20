import { User } from "../schemas/User";

type AuthData = {
  token: string | null;
  user: User;
};

export type AuthInitialState = {
  loading: boolean;
  data: AuthData | null;
  error: string | undefined;
};
