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

  //детал инфа без видео/из кол-ва
  const { data: animeData } = useFullAnimeById(animeId!);

  //все эпизоды сезона + берем отсюда id
  const { data: animeEpisodes } = useAnimeEpisodes(
    animeData?.title || "",
    !!animeData?.title,
  );

  if (!animeData || !animeEpisodes) {
    return null;
  }
  console.log(animeEpisodes);

  //инфа для поиска видео в плеере
  const getUrl = {
    episodeId: animeEpisodes?.episodes[episodeNum].id || "",
    enabled: !!animeEpisodes?.episodes,
  };

  return (
    <div className="mt-25">
      <AnimePlayerSection
        getUrl={getUrl}
        animeType={animeData.type!}
        animeName={animeData.title!}
      />
    </div>
  );
};

export default WatchPage;
