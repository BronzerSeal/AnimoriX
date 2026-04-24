import { bookmark } from "@/shared/types/DataBase";
import AnimesSidebar from "@/widgets/animes-sidebar";
import { ExpandableAnimeSidebar } from "@/widgets/animes-sidebar";
import { useSidebarAnimeList } from "../model/get-anime-list";
import { mapAnimeToHero } from "@/entities/anime/model/animeToHero.mapper";
import { TopAnimeItemWithBanner } from "@/entities/anime/model/types";

const UserSidebar = ({ bookmarks }: { bookmarks: bookmark[] | undefined }) => {
  const results = useSidebarAnimeList(bookmarks);
  const formatResult = results
    .map((r) => r.data)
    .filter((r): r is TopAnimeItemWithBanner => !!r);

  const items = formatResult?.map(mapAnimeToHero) ?? [];
  return (
    <section className="relative w-full md:pl-5 pt-5  ">
      <div className="w-full lg:absolute lg:w-full lg:px-5 lg:-mt-5">
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
