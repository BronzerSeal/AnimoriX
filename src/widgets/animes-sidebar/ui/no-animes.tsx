const NoAnimes = ({ title }: { title: string }) => {
  return (
    <div className="w-full bg-[#EEEEFF] dark:bg-[#11161a] p-4 rounded-md shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </header>
      <div className="flex flex-col gap-3">
        <p>No Animes</p>
      </div>
    </div>
  );
};

export default NoAnimes;
