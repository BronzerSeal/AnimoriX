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

const AnimePlayerSection = ({
  getUrl,
  animeType,
  animeName,
}: {
  getUrl: { episodeId: string; enabled: boolean };
  animeType: string;
  animeName: string;
}) => {
  const {
    data: videoData,
    isError,
    error,
  } = useAnimeVideoById(getUrl.episodeId, getUrl.enabled);

  if (error) return <div>Видео недоступно: {error.message}</div>;
  return (
    <div className="flex flex-col max-w-242.5 bg-[#11161a] rounded-2xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${animeType}`}>{animeType}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{animeName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {videoData?.url && <VideoPlayer url={videoData.url} />}
    </div>
  );
};

export default AnimePlayerSection;
