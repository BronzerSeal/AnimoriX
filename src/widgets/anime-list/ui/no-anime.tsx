import { Button } from "@/shared/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

const NoAnime = () => {
  return (
    <div className="w-full pt-8">
      <div
        className="
          px-6 py-8 text-slate-900 dark:text-white
          sm:px-8 sm:py-10
        "
      >
        <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
          <div className="max-w-md text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-white/70">
              <SearchX className="size-3.5" />
              Empty Search
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Oops! No anime found
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/70 sm:text-base">
              Try a different search, shorten the query, or go back home and
              pick something from the featured lists.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-6 bg-[#f26a3d] text-white hover:bg-[#ff7b51]"
            >
              <Link href="/home">
                <ArrowLeft />
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAnime;
