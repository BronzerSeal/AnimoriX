import { paths } from "@/shared/types/jikan";

type apiResponse =
  paths["/anime/{id}/full"]["get"]["responses"][200]["content"]["application/json"];

export type relations = NonNullable<apiResponse["data"]>["relations"];

type Relation = NonNullable<relations>[number];

export interface mutedRelation extends Relation {
  relation: string;
}
