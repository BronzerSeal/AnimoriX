import { AnimeBadges, HeroAnime } from "@/entities/anime";
import { useRouter } from "next/navigation";

const SidebarItem = ({ item, num }: { item: HeroAnime; num: number }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/watch/${item.id}`)}
      className="relative flex cursor-pointer items-center gap-3 p-3 rounded-xl overflow-hidden dark:bg-[#11161a] text-white group"
    >
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242e36] dark:from-[#11161a] via-[#11161a]/70 to-transparent" />
      </div>

      <div className="relative z-10 flex items-center gap-3 w-full">
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold">{num}</span>
          <div className="w-6 h-[2px] bg-green-500 mt-1 rounded-full transition-colors duration-300 group-hover:bg-orange-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold leading-tight overflow-hidden">
            {item.title}
          </h3>

          <AnimeBadges
            score={item.score}
            rating={item.rating}
            type={item.type}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
