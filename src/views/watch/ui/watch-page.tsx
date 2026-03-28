"use client";
import { useAnimeEpisodes, useFullAnimeById } from "@/entities/anime";
import AnimeEpisodesSection, {
  AnimeEpisodesSectionSkeleton,
} from "@/widgets/anime-episodes-section";
import AnimePlayerSection from "@/widgets/anime-player-section";
import { useParams } from "next/navigation";
import { useState } from "react";

const WatchPage = () => {
  const params = useParams();
  const animeId = params.id as string;
  //какой эпизод сейчас сморим
  const [episodeNum, setEpisodeNum] = useState(0);

  //детал инфа без видео/их кол-ва
  const { data: animeData, isLoading: isAnimeDataLoading } = useFullAnimeById(
    animeId!,
  );

  //все эпизоды сезона + берем отсюда id
  const { data: animeEpisodes, isLoading: isAnimeEpisodesLoading } =
    useAnimeEpisodes(animeData?.title || "", !!animeData?.title);

  //инфа для поиска видео в плеере
  const getUrl = {
    episodeId: animeEpisodes?.episodes[episodeNum].id || "",
    enabled: !!animeEpisodes?.episodes,
  };

  const globalIsLoading = isAnimeDataLoading || isAnimeEpisodesLoading;
  return (
    <div className="w-full px-2 flex justify-center">
      <div className="mt-25 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 max-w-6xl w-full">
        <AnimePlayerSection
          episodeNum={episodeNum}
          getUrl={getUrl}
          animeType={animeData?.type!}
          animeName={animeData?.title!}
          animeId={animeData?.mal_id!}
          isLoading={globalIsLoading}
        />
        {globalIsLoading || !animeEpisodes?.episodes ? (
          <AnimeEpisodesSectionSkeleton />
        ) : (
          <AnimeEpisodesSection
            episodes={animeEpisodes.episodes}
            selected={episodeNum}
            onSelectEpisode={setEpisodeNum}
          />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
