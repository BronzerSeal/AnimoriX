import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/breadcrumb";
import VideoPlayer from "./video-player";
import Seasons from "./seasons";
import AnimePlayerSectionSkeleton from "./anime-player-section-skeleton";
import NotFound from "./not-found";
import { useAnimeVideoById } from "@/entities/anime";
import { EpisodePlayerSkeleton } from "./episode-player-skeleton";
import BookmarkAnimeBtn from "@/features/bookmark-anime-btn";

const AnimePlayerSection = ({
  episodeId,
  animeType,
  animeName,
  animeId,
  isLoading,
  episodeNum,
  className,
  fallbackUrl = null,
}: {
  episodeId: string;
  animeType: string;
  animeName: string;
  animeId: number;
  isLoading: boolean;
  episodeNum: number;
  className?: string;
  fallbackUrl?: string | null;
}) => {
  const {
    data: videoData,
    error,
    isLoading: isVideoLoading,
    isFetching: isVideoFetching,
  } = useAnimeVideoById(episodeId, !!episodeId);
  const isInitialLoading = isLoading || (isVideoLoading && !videoData);
  const isEpisodeSwitching =
    !!episodeId &&
    (isVideoFetching || isVideoLoading) &&
    videoData?.episodeId !== episodeId;

  if (isInitialLoading) return <AnimePlayerSectionSkeleton />;
  if (!fallbackUrl) {
    if (error) {
      return (
        <NotFound
          errCode=""
          errMessage={error?.message || "Episode not found"}
        />
      );
    }
  }

  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] pt-2 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none ${className}`}
    >
      <Breadcrumb className="p-2 px-7">
        <BreadcrumbList className="text-slate-500 dark:text-white/55">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/home"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-400 dark:text-white/35" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/types/${animeType}`}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              {animeType}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-400 dark:text-white/35" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-slate-900 dark:text-white">
              {animeName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isEpisodeSwitching ? (
        <EpisodePlayerSkeleton />
      ) : (
        <>
          {videoData?.url ? (
            <VideoPlayer url={videoData.url} />
          ) : fallbackUrl ? (
            <VideoPlayer url={fallbackUrl} isTrailer />
          ) : null}
          <div className="flex flex-1 justify-between p-2 text-[14px] text-slate-700 dark:text-white/80">
            <h1 className="font-medium text-slate-900 dark:text-white">
              You are watching Episode {episodeNum > 0 ? episodeNum + 1 : 1}
            </h1>
            <p className="text-slate-500 dark:text-white/55">
              <BookmarkAnimeBtn
                animeId={animeId}
                animeName={animeName}
                size={6}
              />
            </p>
          </div>
        </>
      )}

      <section className="p-2 bg-[#efeefe] dark:bg-[#181d21] rounded-b-2xl">
        <Seasons animeId={animeId} />
      </section>
    </div>
  );
};

export default AnimePlayerSection;
