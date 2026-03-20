"use client";
import { mapAnimeToHero } from "@/entities/anime/model/anime.mapper";
import { useTopAnimesWithBanners } from "@/entities/anime/queries/anime.queries";
import SidebarItem from "./sidebar-item";
import TopAnimesSidebarSkeleton from "./top-animes-sidebar-skeleton";

const TopAnimesSidebar = () => {
  const { data, isLoading } = useTopAnimesWithBanners();
  if (isLoading) {
    return <TopAnimesSidebarSkeleton />;
  }

  if (!data?.data?.length) {
    return null;
  }

  const items = data.data.map(mapAnimeToHero);
  return (
    <div className="w-full bg-[#EEEEFF] dark:bg-[#11161a] p-4 rounded-md shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Top Trending
        </h2>
      </header>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <SidebarItem item={item} num={i} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default TopAnimesSidebar;
