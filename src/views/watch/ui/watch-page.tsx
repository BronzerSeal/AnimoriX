"use client";
import { useAnimeEpisodes, useFullAnimeById } from "@/entities/anime";
import AnimeEpisodesSection, {
  AnimeEpisodesSectionSkeleton,
} from "@/widgets/anime-episodes-section";
import AnimeInfoSection, {
  AnimeInfoSectionSkeleton,
} from "@/widgets/anime-info-section";
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
      <div className="mt-25 grid w-full max-w-[1440px] grid-cols-1 gap-4 xl:gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(320px,1.15fr)_minmax(0,3.2fr)_minmax(360px,1.15fr)]">
        <AnimePlayerSection
          className="order-1 xl:order-2 xl:col-start-2 xl:row-start-1"
          episodeNum={episodeNum}
          getUrl={getUrl}
          animeType={animeData?.type!}
          animeName={animeData?.title!}
          animeId={animeData?.mal_id!}
          isLoading={globalIsLoading}
        />
        {globalIsLoading || !animeEpisodes?.episodes ? (
          <AnimeEpisodesSectionSkeleton className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 xl:order-3 xl:col-start-3 xl:row-start-1" />
        ) : (
          <AnimeEpisodesSection
            className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 xl:order-3 xl:col-start-3 xl:row-start-1"
            episodes={animeEpisodes.episodes}
            selected={episodeNum}
            onSelectEpisode={setEpisodeNum}
          />
        )}
        {isAnimeDataLoading ? (
          <AnimeInfoSectionSkeleton className="order-3 lg:order-3 lg:col-span-2 xl:order-1 xl:col-span-1 xl:col-start-1 xl:row-start-1" />
        ) : (
          <AnimeInfoSection
            animeInfo={animeData!}
            className="order-3 lg:order-3 lg:col-span-2 xl:order-1 xl:col-span-1 xl:col-start-1 xl:row-start-1"
          />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
