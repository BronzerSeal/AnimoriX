import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";

const SliderChevrons = ({
  api,
  current,
  itemsLength,
}: {
  api: EmblaCarouselType | undefined;
  current: number;
  itemsLength: number;
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-black/40 px-3 py-1.5 text-white backdrop-blur-sm sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 sm:gap-4 sm:px-4 sm:py-2">
      <button
        onClick={() => api?.scrollPrev()}
        className="rounded-md p-1 transition hover:bg-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <div className="text-xs font-medium sm:text-sm">
        <span>{current + 1}</span>
        <span className="mx-1 text-white/50">/</span>
        <span className="text-white/70">{itemsLength}</span>
      </div>

      <button
        onClick={() => api?.scrollNext()}
        className="rounded-md p-1 transition hover:bg-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default SliderChevrons;
