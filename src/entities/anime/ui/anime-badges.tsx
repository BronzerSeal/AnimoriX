interface Props {
  rating: string;
  score: number;
  type: string;
}

export const AnimeBadges = ({ rating, score, type }: Props) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-[10px] font-bold text-orange-400 border border-orange-400 px-1 rounded">
        {rating || "N/A"}
      </span>
      <span className="text-[10px] font-bold text-green-400 border border-green-400 px-1 rounded flex items-center gap-0.5">
        <span className="w-2 h-2 bg-green-400 rounded-full" />
        {Math.round(score)}
      </span>
      <span className="text-[10px] text-gray-300">{type}</span>
    </div>
  );
};
