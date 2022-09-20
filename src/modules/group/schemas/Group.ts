import { Person } from "./Person";
import { Rol } from "./Rol";

export type Group = {
  id: string;
  name: string;
  description: string;
  type: boolean;
  roles: Rol[];
  people: Person[];
  members: number;
};
