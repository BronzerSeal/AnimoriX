import { paths } from "./jikan";

export interface UserFromDB {
  id: string;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  name: string;
  provider: "credentials" | "google";
  createdAt: Date;
}

export type userFromJikan =
  paths["/users/{username}/full"]["get"]["responses"][200]["content"]["application/json"];

export interface bookmark {
  id: string;
  userId: string;
  animeId: number;
  animeName: string;
  createdAt: Date;
}
