"use client";
import { useAnimeEpisodes, useFullAnimeById } from "@/entities/anime";
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
    <div className="mt-25 flex justify-center px-2 w-full">
      <AnimePlayerSection
        getUrl={getUrl}
        animeType={animeData?.type!}
        animeName={animeData?.title!}
        animeId={animeData?.mal_id!}
        isLoading={globalIsLoading}
      />
    </div>
  );
};

export default WatchPage;
