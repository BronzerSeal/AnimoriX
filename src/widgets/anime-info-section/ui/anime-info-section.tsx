import { FullAnimeByIdItem } from "@/entities/anime/model/types";
import Dekstop from "./dekstop";
import Mobile from "./mobile";
import AnimeInfoSectionSkeleton from "./anime-info-section-skeleton";

type Props = {
  className?: string;
  animeInfo: FullAnimeByIdItem | null;
};

const AnimeInfoSection: React.FC<Props> = ({ className, animeInfo }) => {
  if (!animeInfo) return <AnimeInfoSectionSkeleton className={className} />;

  return (
    <>
      <Dekstop className={className} animeInfo={animeInfo} />

      <Mobile className={className} animeInfo={animeInfo} />
    </>
  );
};

export default AnimeInfoSection;
