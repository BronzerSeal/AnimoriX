"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTopTenAnimes, getTopTenAnimesWithBanners } from "../api/anime.api";
import { getSeasonNow } from "../api/season-now.api";

export function useTopAnimes() {
  return useQuery({
    queryKey: ["top-animes"],
    queryFn: getTopTenAnimes,
  });
}

export function useTopAnimesWithBanners() {
  return useQuery({
    queryKey: ["top-animes-banners"],
    queryFn: getTopTenAnimesWithBanners,
  });
}

export function useNowSeasons(page = 1) {
  return useQuery({
    queryKey: ["season-now", page],
    queryFn: () => getSeasonNow(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}
