import { paths } from "@/shared/types/jikan";

type AnimeRecommendationsByIdResponse =
  paths["/anime/{id}/recommendations"]["get"]["responses"][200]["content"]["application/json"];

export type Recommendation = NonNullable<
  NonNullable<AnimeRecommendationsByIdResponse>["data"]
>[number]["entry"];
