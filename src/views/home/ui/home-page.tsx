import MainHeader from "@/widgets/main-header";
import TopAnimesPagination from "@/widgets/top-animes-pagination";

const HomePage = () => {
  return (
    <div className="max-w-1250 p-5">
      <MainHeader />
      <TopAnimesPagination />
    </div>
  );
};

export default HomePage;
