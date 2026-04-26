import { UserFromDB } from "@/shared/types/DataBase";
import axios from "axios";
import { paths } from "@/shared/types/jikan";

type JikanUser =
  paths["/users/{username}/full"]["get"]["responses"][200]["content"]["application/json"];

type getUserInfoResponse =
  | { status: "success"; type: "db"; user: UserFromDB }
  | { status: "success"; type: "jikan"; user: JikanUser }
  | { status: "error"; message: string };

export async function getUserInfo(
  userId: string,
  userName: string,
): Promise<getUserInfoResponse> {
  const res = await axios.get<getUserInfoResponse>(
    `/api/users?userId=${userId}&userName=${userName}`,
  );
  return res.data;
}
