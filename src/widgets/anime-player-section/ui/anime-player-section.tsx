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
import { Skeleton } from "@/shared/ui/skeleton";

const EpisodePlayerSkeleton = () => {
  return (
    <>
      <div className="px-2">
        <Skeleton className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="flex justify-between gap-4 p-2 text-[14px]">
        <Skeleton className="h-5 w-44 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-5 w-28 bg-slate-200 dark:bg-white/8" />
      </div>
    </>
  );
};

const AnimePlayerSection = ({
  episodeId,
  animeType,
  animeName,
  animeId,
  isLoading,
  episodeNum,
  className,
}: {
  episodeId: string;
  animeType: string;
  animeName: string;
  animeId: number;
  isLoading: boolean;
  episodeNum: number;
  className?: string;
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
  if (error) return <NotFound errCode="" errMessage={error.message} />;
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
              href={`/${animeType}`}
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
          {videoData?.url && <VideoPlayer url={videoData.url} />}
          <div className="flex flex-1 justify-between p-2 text-[14px] text-slate-700 dark:text-white/80">
            <h1 className="font-medium text-slate-900 dark:text-white">
              You are watching Episode {episodeNum > 0 ? episodeNum + 1 : 1}
            </h1>
            <p className="text-slate-500 dark:text-white/55">
              here will be dub btns
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
