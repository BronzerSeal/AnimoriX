"use client";
import { useQuery } from "@tanstack/react-query";
import { getTopTenAnimes, getTopTenAnimesWithBanners } from "../api/anime.api";

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
