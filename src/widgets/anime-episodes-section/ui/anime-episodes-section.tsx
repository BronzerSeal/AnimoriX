"use client";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Episode } from "../model/types";
import { useEffect, useState } from "react";

const AnimeEpisodesSection = ({
  episodes,
  selected,
  onSelectEpisode,
  className,
}: {
  episodes: Episode[];
  selected: number;
  onSelectEpisode: (episodeIndex: number) => void;
  className?: string;
}) => {
  if (!episodes) return null;
  const EPISODES_PER_PAGE = 100;

  const [page, setPage] = useState(
    Math.floor(selected / EPISODES_PER_PAGE) + 1,
  );
  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);

  useEffect(() => {
    setPage(Math.floor(selected / EPISODES_PER_PAGE) + 1);
  }, [selected]);

  const startIndex = (page - 1) * EPISODES_PER_PAGE;
  const endIndex = page * EPISODES_PER_PAGE;
  const filteredEpisodes = episodes.slice(startIndex, endIndex);
  const pageRanges = Array.from({ length: totalPages }, (_, index) => {
    const rangeStart = index * EPISODES_PER_PAGE + 1;
    const rangeEnd = Math.min((index + 1) * EPISODES_PER_PAGE, episodes.length);

    return {
      value: String(index + 1),
      label: `${String(rangeStart).padStart(3, "0")}-${String(rangeEnd).padStart(3, "0")}`,
    };
  });

  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          Episodes
        </h1>
        <Select
          value={String(page)}
          onValueChange={(value) => setPage(Number(value))}
        >
          <SelectTrigger className="h-9 min-w-36 rounded-xl border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-none dark:border-white/8 dark:bg-[#1b232c] dark:text-slate-100 dark:hover:bg-[#202933]">
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-white/8 dark:bg-[#1b232c]"
          >
            {pageRanges.map((range) => (
              <SelectItem
                key={range.value}
                value={range.value}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 focus:bg-orange-400 focus:text-white dark:text-slate-300 dark:focus:bg--orange-400 dark:focus:text-white"
              >
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {filteredEpisodes.map((episode, i) => (
          <Button
            key={episode.id}
            type="button"
            size="icon-sm"
            onClick={() => onSelectEpisode(startIndex + i)}
            className={`size-10 h-6.25 rounded-md border text-[12px] font-semibold transition-colors duration-200 ease-in-out ${
              selected === startIndex + i
                ? "border-orange-400 bg-orange-400 text-white hover:bg-orange-400/90"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-white/8 dark:bg-[#141b22] dark:text-slate-100 dark:hover:bg-[#1b232c]"
            }`}
          >
            {episode.number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnimeEpisodesSection;
