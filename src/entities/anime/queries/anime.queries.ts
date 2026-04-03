"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTopTenAnimes, getTopTenAnimesWithBanners } from "../api/anime.api";
import { getSeasonNow } from "../api/season-now.api";
import { getAnimeFullById } from "../api/anime-by-id";
import { getAnimeEpisodes } from "../api/anime-episodes.api";
import { getAnimeVideoById } from "../api/anime-video";
import { getAnimeSeasons } from "../api/anime-seasons.api";
import { getAnimeRecommendations } from "../api/anime-recommendations.api";

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

export function useFullAnimeById(animeId: string) {
  return useQuery({
    queryKey: ["anime-by-id", animeId],
    queryFn: () => getAnimeFullById(animeId),
    select: (data) => data.data,
  });
}

export function useAnimeEpisodes(animeTitle: string, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-episodes", animeTitle],
    queryFn: () => getAnimeEpisodes(animeTitle),
    select: (data) => data.data,
    enabled,
  });
}

export function useAnimeVideoById(animeId: string, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-video", animeId],
    queryFn: () => getAnimeVideoById(animeId),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useAnimeSeasons(animeId: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-seasons", animeId],
    queryFn: () => getAnimeSeasons(animeId),
    enabled,
  });
}

export function useAnimeRecommendations(animeId: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-recommendations", animeId],
    queryFn: () => getAnimeRecommendations(animeId),
    select: (data) => data.data,
    enabled,
  });
}
