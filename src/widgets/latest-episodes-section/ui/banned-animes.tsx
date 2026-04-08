export const BannedAnimeItem = () => {
  return (
    <article className="group basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-3rem)/4)] xl:basis-[calc((100%-5rem)/6)] flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 transition-transform duration-300 ease-out group-hover:-translate-y-[6px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(248,113,113,0.28),transparent_38%)] transition-transform duration-300 ease-out group-hover:-translate-y-[6px]" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md transition-transform duration-300 ease-out group-hover:-translate-y-[6px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-red-400/35 bg-black/25 px-4 py-2 text-xl font-bold tracking-widest text-red-400">
              18+
            </span>
          </div>
        </div>

        <h2 className="mt-2 text-sm font-semibold leading-tight text-slate-400 line-clamp-2 transition-transform duration-300 ease-out group-hover:-translate-y-1">
          BANNED
        </h2>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <div className="h-[18px] w-[38px] rounded border border-orange-400/35 bg-orange-400/8" />
        <div className="h-[18px] w-[34px] rounded border border-green-400/35 bg-green-400/8" />
        <div className="h-[12px] w-[24px] rounded bg-zinc-700/50" />
      </div>
    </article>
  );
};
