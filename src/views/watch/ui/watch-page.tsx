"use client";
import { useAnimeEpisodes, useFullAnimeById } from "@/entities/anime";
import AnimeEpisodesSection, {
  AnimeEpisodesSectionSkeleton,
} from "@/widgets/anime-episodes-section";
import AnimeInfoSection, {
  AnimeInfoSectionSkeleton,
} from "@/widgets/anime-info-section";
import AnimePlayerSection from "@/widgets/anime-player-section";
import AnimeRecommendation, {
  AnimeRecommendationSkeleton,
} from "@/widgets/anime-recommendation";
import AnimeRelations, {
  AnimeRelationsSkeleton,
} from "@/widgets/anime-relations";
import CommentSection, {
  CommentSectionSkeleton,
} from "@/widgets/comments-section";
import ShareSite from "@/widgets/share-site";
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

  const globalIsLoading = isAnimeDataLoading || isAnimeEpisodesLoading;
  return (
    <div className="w-full px-2 md:px-4 flex flex-col justify-center items-center">
      <div className="mt-25 grid w-full max-w-500 grid-cols-1 gap-4 xl:gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(320px,1.15fr)_minmax(0,3.2fr)_minmax(360px,1.15fr)]">
        <AnimePlayerSection
          className="order-1 xl:order-2 xl:col-start-2 xl:row-start-1"
          episodeNum={episodeNum}
          episodeId={animeEpisodes?.episodes[episodeNum].id || ""}
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
      <div className="mt-10 w-full">
        <ShareSite />
      </div>
      <div className="mt-5 grid w-full max-w-500 grid-cols-1 xl:grid-cols-[10fr_1fr]">
        <div className="w-full xl:mr-3">
          {!animeData ? (
            <CommentSectionSkeleton />
          ) : (
            <CommentSection animeId={animeData?.mal_id!} />
          )}
        </div>
        <div className="flex w-full flex-col gap-3">
          {!animeData ? (
            <>
              <AnimeRelationsSkeleton />
              <AnimeRecommendationSkeleton />
            </>
          ) : (
            <>
              <AnimeRelations relations={animeData.relations} />
              <AnimeRecommendation animeId={animeData.mal_id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
