"use client";
import SidebarItem from "./sidebar-item";
import AnimesSidebarSkeleton from "./animes-sidebar-skeleton";
import NoAnimes from "./no-animes";

type Props = {
  items: any[];
  title?: string;
  isLoading?: boolean;
};

const AnimesSidebar = ({ items, title = "Top Trending", isLoading }: Props) => {
  if (isLoading) {
    return <AnimesSidebarSkeleton />;
  }

  if (!items?.length) return <NoAnimes title={title} />;

  return (
    <div className="w-full bg-[#EEEEFF] dark:bg-[#11161a] p-4 rounded-md shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </header>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <SidebarItem item={item} num={i + 1} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AnimesSidebar;
