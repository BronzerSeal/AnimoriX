import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/breadcrumb";
import VideoPlayer from "./video-player";
import { useAnimeVideoById } from "@/entities/anime/queries/anime.queries";
import Seasons from "./seasons";
import AnimePlayerSectionSkeleton from "./anime-player-section-skeleton";
import NotFound from "./not-found";

const AnimePlayerSection = ({
  getUrl,
  animeType,
  animeName,
  animeId,
  isLoading,
}: {
  getUrl: { episodeId: string; enabled: boolean };
  animeType: string;
  animeName: string;
  animeId: number;
  isLoading: boolean;
}) => {
  const {
    data: videoData,
    error,
    isLoading: isVideoLoading,
  } = useAnimeVideoById(getUrl.episodeId, getUrl.enabled);

  if (isLoading || isVideoLoading) return <AnimePlayerSectionSkeleton />;
  if (error) return <NotFound errCode="" errMessage={error.message} />;
  return (
    <div className="flex w-full max-w-242.5 flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] py-2 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none">
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
      {videoData?.url && <VideoPlayer url={videoData.url} />}
      <div className="flex justify-between p-2 text-[14px] text-slate-700 dark:text-white/80">
        <h1 className="font-medium text-slate-900 dark:text-white">
          You are watching Episode 1
        </h1>
        <p className="text-slate-500 dark:text-white/55">
          here will be dub btns
        </p>
      </div>
      <section className="p-2">
        <Seasons animeId={animeId} />
      </section>
    </div>
  );
};

export default AnimePlayerSection;
