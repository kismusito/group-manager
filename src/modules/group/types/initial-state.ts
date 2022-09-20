import { Group } from "../schemas/Group";

type Groups = {
    items: Group[]
    loading: boolean
}

export type GroupInitialState = {
  groups: Groups;
  group: Group | null;
  error: string | null;
};
