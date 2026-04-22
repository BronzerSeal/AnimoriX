"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimeBadges, HeroAnime } from "@/entities/anime";
import { useOutsideClick } from "@/shared/hooks";
import AnimesSidebarSkeleton from "./animes-sidebar-skeleton";
import NoAnimes from "./no-animes";

type Props = {
  items: any[];
  title?: string;
  isLoading?: boolean;
};

export function ExpandableAnimeSidebar({
  items,
  title = "Top Trending",
  isLoading,
}: Props) {
  const router = useRouter();
  const [active, setActive] = useState<HeroAnime | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (isLoading) {
    return <AnimesSidebarSkeleton />;
  }

  if (!items?.length) return <NoAnimes title={title} />;

  return (
    <>
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm dark:bg-black/50"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.button
              key={`close-${active.id}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/70 bg-white/90 text-slate-700 shadow-lg lg:hidden dark:border-white/20 dark:bg-[#11161a]/90 dark:text-white"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-[#f8f8ff] text-slate-900 shadow-2xl dark:border-white/10 dark:bg-[#11161a] dark:text-white"
            >
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative h-64 w-full md:h-80"
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8ff] via-[#f8f8ff]/35 to-transparent dark:from-[#11161a] dark:via-[#11161a]/70" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-300/70 bg-white/85 text-slate-700 shadow-lg lg:flex dark:border-white/20 dark:bg-[#11161a]/80 dark:text-white"
                >
                  <CloseIcon />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="text-2xl font-semibold leading-tight text-slate-900 dark:text-white"
                  >
                    {active.title}
                  </motion.h3>
                  <div className="mt-2">
                    <AnimeBadges
                      score={active.score}
                      rating={active.rating}
                      type={active.type}
                    />
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-white/70">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 dark:border-white/10 dark:bg-white/5">
                    {active.year ?? "Unknown year"}
                  </span>
                  {active.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 dark:border-white/10 dark:bg-white/5"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="max-h-60 overflow-y-auto pr-1 text-sm leading-6 text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden dark:text-white/80"
                >
                  {active.description}
                </motion.p>

                <div className="flex justify-end">
                  <motion.button
                    layoutId={`button-${active.id}-${id}`}
                    type="button"
                    onClick={() => router.push(`/watch/${active.id}`)}
                    className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                  >
                    Watch now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="w-full rounded-md bg-[#EEEEFF] p-4 shadow-md dark:bg-[#11161a]">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
        </header>

        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              layoutId={`card-${item.id}-${id}`}
              type="button"
              onClick={() => setActive(item)}
              className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl p-3 text-left text-slate-900 dark:text-white"
            >
              <motion.div
                layoutId={`image-${item.id}-${id}`}
                className="absolute inset-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8ff] via-[#f8f8ff]/75 to-transparent dark:from-[#242e36] dark:via-[#11161a]/80 dark:to-transparent" />
              </motion.div>

              <div className="relative z-10 flex w-full items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">{index + 1}</span>
                  <div className="mt-1 h-[2px] w-6 rounded-full bg-green-500 transition-colors duration-300 group-hover:bg-orange-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <motion.h3
                    layoutId={`title-${item.id}-${id}`}
                    className="overflow-hidden text-sm font-semibold leading-tight"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.div layoutId={`description-${item.id}-${id}`}>
                    <AnimeBadges
                      score={item.score}
                      rating={item.rating}
                      type={item.type}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
