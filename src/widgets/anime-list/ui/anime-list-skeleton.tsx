import { AnimeItemSkeleton } from "@/entities/anime";

const AnimeListSkeleton = ({ blockTitle }: { blockTitle: string }) => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  return (
    <main className="w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)]" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto w-full max-w-425 mt-25 px-5">
        <h1 className="text-xl font-bold">{blockTitle}</h1>
        <section className="flex gap-4 flex-wrap">
          {skeletonItems.map((item) => (
            <AnimeItemSkeleton key={item} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default AnimeListSkeleton;
