import { AnimeCard, useAnimeRecommendations } from "@/entities/anime";
import { Recommendation } from "../model/types";
import AnimeRecommendationSkeleton from "./anime-recommendation-skeleton";

const AnimeRecommendation = ({ animeId }: { animeId: number | undefined }) => {
  const isEnabled = !!animeId;
  const { data: recommendationsData, isLoading } = useAnimeRecommendations(
    animeId!,
    isEnabled,
  );

  const mutRecommendations: Recommendation[] =
    recommendationsData !== undefined
      ? recommendationsData
          .filter((r) => r.entry?.mal_id)
          .map((rec) => ({
            ...rec.entry,
          }))
          .slice(0, 5)
      : [];

  if (!isEnabled) return null;
  if (isLoading) return <AnimeRecommendationSkeleton />;
  if (!mutRecommendations.length) return null;
  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none`}
    >
      <h1 className="font-bold text-xl">Recommendations</h1>
      <div className="flex flex-col gap-2">
        {mutRecommendations.map((rec) => (
          <AnimeCard animeInfo={rec!} key={rec?.mal_id} />
        ))}
      </div>
    </div>
  );
};

export default AnimeRecommendation;
