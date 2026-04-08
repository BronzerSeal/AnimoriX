"use client";
import {
  useCompletedColumn,
  useNowReleasesColumn,
  useUpcomingColumn,
} from "@/features/get-animes-column";
import AnimeColumn from "@/widgets/anime-column";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

const getVisibleColumns = (width: number) => {
  if (width >= DESKTOP_BREAKPOINT) {
    return 3;
  }

  if (width >= MOBILE_BREAKPOINT) {
    return 2;
  }

  return 1;
};

const HomePageColumns = () => {
  const { items: nowReleaseItems, isLoading: nowReleasesLoading } =
    useNowReleasesColumn();
  const { items: upcomingItems, isLoading: upcomingLoading } =
    useUpcomingColumn(!!nowReleaseItems);
  const { items: completedItems, isLoading: completedLoading } =
    useCompletedColumn(!!upcomingItems);
  const [visibleColumns, setVisibleColumns] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setVisibleColumns(getVisibleColumns(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "new-releases",
        title: "New Releases",
        href: "/recent",
        items: nowReleaseItems,
        isLoading: nowReleasesLoading,
      },
      {
        key: "upcoming",
        title: "Upcoming",
        href: "/upcoming",
        items: upcomingItems,
        isLoading: upcomingLoading,
      },
      {
        key: "completed",
        title: "Completed",
        href: "/completed",
        items: completedItems,
        isLoading: completedLoading,
      },
    ],
    [
      completedItems,
      completedLoading,
      nowReleaseItems,
      nowReleasesLoading,
      upcomingItems,
      upcomingLoading,
    ],
  );

  const maxPage = Math.max(0, columns.length - visibleColumns);
  const currentPage = Math.min(page, maxPage);
  const visibleSlice = columns.slice(currentPage, currentPage + visibleColumns);
  const showColumnNavigation = visibleColumns < columns.length;
  const gridClassName =
    visibleColumns === 3
      ? "grid-cols-3"
      : visibleColumns === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  return (
    <div className="w-full">
      <div className={`grid gap-3 ${gridClassName}`}>
        {visibleSlice.map((column) => (
          <AnimeColumn
            key={column.key}
            title={column.title}
            href={column.href}
            items={column.items}
            isLoading={column.isLoading}
          />
        ))}
      </div>

      {showColumnNavigation ? (
        <div className="mt-5 flex items-center justify-center gap-4 text-sm text-black/65 dark:text-white/65">
          <button
            type="button"
            onClick={() =>
              setPage((prev) => Math.max(0, Math.min(prev, maxPage) - 1))
            }
            disabled={currentPage === 0}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-white/5 hover:text-black dark:hover:text-white disabled:pointer-events-none disabled:opacity-35  "
          >
            <ChevronLeft className="size-4" />
            Prev
          </button>

          <div className="flex items-center gap-2">
            {columns.map((column, index) => {
              const isActive =
                index >= currentPage && index < currentPage + visibleColumns;

              return (
                <button
                  key={column.key}
                  type="button"
                  aria-label={`Show ${column.title}`}
                  onClick={() =>
                    setPage(Math.min(index, columns.length - visibleColumns))
                  }
                  className={`h-2.5 rounded-full transition-all ${
                    isActive
                      ? "w-8 bg-[#2db66d]"
                      : "w-2.5 bg-black/20 dark:bg-white/20 hover:bg-black/35 dark:hover:bg-white/35"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              setPage((prev) => Math.min(maxPage, Math.min(prev, maxPage) + 1))
            }
            disabled={currentPage >= maxPage}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-white/5 hover:text-black dark:hover:text-white  disabled:pointer-events-none disabled:opacity-35"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default HomePageColumns;
