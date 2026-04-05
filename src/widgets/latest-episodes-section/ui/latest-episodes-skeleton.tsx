import { AnimeItemSkeleton } from "@/entities/anime";

const LatestEpisodesSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => index);
  return (
    <div className="cursor-pointer">
      <section className="flex justify-between items-center mb-3 ">
        <h1 className="font-bold">LATEST UPDATES</h1>
        <p>pagination+filters</p>
      </section>
      <section className="flex gap-4 flex-wrap">
        {skeletonItems.map((item) => (
          <AnimeItemSkeleton key={item} />
        ))}
      </section>
    </div>
  );
};

export default LatestEpisodesSkeleton;
