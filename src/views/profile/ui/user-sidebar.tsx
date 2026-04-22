import AnimesSidebar from "@/widgets/animes-sidebar";
import { ExpandableAnimeSidebar } from "@/widgets/animes-sidebar";

const UserSidebar = () => {
  //   const { data, isLoading } = useTopAnimesWithBanners();
  //   const items = data?.data?.map(mapAnimeToHero) ?? [];

  const items: any[] = [];
  return (
    <section className="relative w-full px-5 pt-1 lg:px-0 lg:pr-8">
      <div className="w-full lg:absolute lg:w-full lg:px-5 lg:pr-8 lg:-mt-5">
        {/* mobile */}
        <div className="sm:hidden">
          <AnimesSidebar title="Watch List" items={items} />
        </div>
        {/* desktop */}
        <div className="hidden sm:flex">
          <ExpandableAnimeSidebar title="Watch List" items={items} />
        </div>
      </div>
    </section>
  );
};

export default UserSidebar;
