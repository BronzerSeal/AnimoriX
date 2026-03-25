export const AnimeItemSkeleton = () => {
  return (
    <article className="basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-5rem)/6)]">
      <div className="w-full aspect-[3/4] rounded-2xl bg-zinc-800/70 animate-pulse" />
      <div className="mt-2 h-4 w-5/6 rounded bg-zinc-800/70 animate-pulse" />
      <div className="mt-2 flex items-center gap-2">
        <div className="h-4 w-10 rounded bg-zinc-800/70 animate-pulse" />
        <div className="h-4 w-12 rounded bg-zinc-800/70 animate-pulse" />
        <div className="h-3 w-10 rounded bg-zinc-800/70 animate-pulse" />
      </div>
    </article>
  );
};
