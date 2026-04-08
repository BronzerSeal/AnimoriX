import { anime } from "@/entities/anime/model/types";
import NoAnime from "./no-anime";
import { Button } from "@/shared/ui/button";
import AnimeListSkeleton from "./anime-list-skeleton";
import AnimeThreeDItem from "@/entities/anime/ui/anime-3d-item";

interface Props {
  animes: anime[] | undefined;
  blockTitle: string;
  isLoading: boolean;
  loadMore?: () => void;
  disabledLoadMore?: boolean;
  hasNextPage?: boolean;
}

const AnimeList = ({
  animes,
  blockTitle,
  isLoading,
  loadMore,
  disabledLoadMore,
  hasNextPage,
}: Props) => {
  if (isLoading) {
    return <AnimeListSkeleton blockTitle={blockTitle} />;
  }

  return (
    <main className="w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)]" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto w-full max-w-425 mt-25 px-5">
        <h1 className="text-xl font-bold mb-2">{blockTitle}</h1>
        <section className="flex gap-4 flex-wrap">
          {animes?.length === 0 && <NoAnime />}
          {animes?.map((anime, idx) => (
            <AnimeThreeDItem anime={anime} key={`${anime.id}-${idx}`} />
          ))}
        </section>
        {animes?.length !== 0 && (
          <Button
            variant="outline"
            size="lg"
            className="mt-3 w-full"
            onClick={loadMore}
            disabled={disabledLoadMore}
          >
            {hasNextPage ? "Load More Animes" : "No More Animes"}
          </Button>
        )}
      </div>
    </main>
  );
};

export default AnimeList;
