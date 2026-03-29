interface Props {
  rating: string;
  score: number;
  type: string;
}

export const AnimeBadges = ({ rating, score, type }: Props) => {
  return (
    <div className="mt-1 flex items-center gap-2">
      <span className="rounded border border-orange-400 px-1 text-[10px] font-bold text-orange-400">
        {rating || "N/A"}
      </span>
      <span className="flex items-center gap-0.5 rounded border border-green-400 px-1 text-[10px] font-bold text-green-500 dark:text-green-400">
        <span className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400" />
        {Math.round(score)}
      </span>
      <span className="text-[10px] text-slate-500 dark:text-white/55">
        {type}
      </span>
    </div>
  );
};
