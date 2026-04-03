import { AnimeCard } from "@/entities/anime";
import { relations } from "./model/types";
import AnimeRelationsSkeleton from "./anime-relations-skeleton";

const AnimeRelations = ({
  relations,
  isLoading = false,
}: {
  relations: relations;
  isLoading?: boolean;
}) => {
  if (isLoading) return <AnimeRelationsSkeleton />;
  if (!relations?.length) return null;
  const mutRelations = relations
    .filter((r) => r.entry?.length)
    .map((relation) => ({
      ...relation.entry![0],
      relation: relation.relation,
    }))
    .slice(0, 5);
  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none`}
    >
      <h1 className="font-bold text-xl">Relations</h1>
      <div className="flex flex-col gap-2">
        {mutRelations.map((relation) => (
          <AnimeCard animeInfo={relation} key={relation.mal_id} />
        ))}
      </div>
    </div>
  );
};

export default AnimeRelations;
