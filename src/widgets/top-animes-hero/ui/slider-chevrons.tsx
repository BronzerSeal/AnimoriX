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
    <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 rounded-xl bg-black/40 px-4 py-2 text-white backdrop-blur-sm">
      <button
        onClick={() => api?.scrollPrev()}
        className="rounded-md p-1 transition hover:bg-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="text-sm font-medium">
        <span>{current + 1}</span>
        <span className="mx-1 text-white/50">/</span>
        <span className="text-white/70">{itemsLength}</span>
      </div>

      <button
        onClick={() => api?.scrollNext()}
        className="rounded-md p-1 transition hover:bg-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SliderChevrons;
