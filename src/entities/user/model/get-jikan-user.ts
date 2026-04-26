import { paths } from "@/shared/types/jikan";
import { animeApiHttp } from "@/shared/api/anime-http";

type getJikanUserByNameResponse =
  paths["/users/{username}/full"]["get"]["responses"][200]["content"]["application/json"];

export async function getJikanUserByName(
  name: string,
): Promise<getJikanUserByNameResponse> {
  return await animeApiHttp.get<getJikanUserByNameResponse>(
    `/users/${name}/full`,
  );
}
