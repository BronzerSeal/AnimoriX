"use client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getTopTenAnimes, getTopTenAnimesWithBanners } from "../api/anime.api";
import { getSeasonNow } from "../api/season-now.api";
import { getAnimeEpisodes } from "../api/anime-episodes.api";
import { getAnimeVideoById } from "../api/anime-video";
import { getAnimeSeasons } from "../api/anime-seasons.api";
import { getAnimeRecommendations } from "../api/anime-recommendations.api";
import { getAnimeCommentsById } from "../api/anime-comments.api";
import { getAnime, getAnimeFullById } from "../api/anime-search.api";
import { getAnimeRandom } from "../api/anime-random.api";

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

export function useInfinityNowSeasons() {
  return useInfiniteQuery({
    queryKey: ["season-now"],
    queryFn: ({ pageParam = 1 }) => getSeasonNow(pageParam, 25),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
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
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeVideoById(animeId: string, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-video", animeId],
    queryFn: () => getAnimeVideoById(animeId),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    retry: 1,
    enabled,
  });
}

export function useAnimeSeasons(animeId: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-seasons", animeId],
    queryFn: () => getAnimeSeasons(animeId),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeRecommendations(animeId: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-recommendations", animeId],
    queryFn: () => getAnimeRecommendations(animeId),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeComment(animeId: number, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-comments", animeId],
    queryFn: ({ pageParam = 1 }) => getAnimeCommentsById(animeId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useSearchAnime(name: string, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-search", name],
    queryFn: ({ pageParam }) => getAnime({ q: name, page: pageParam }),
    // select: (data) => data.data,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeByType(type: string, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-type", type],
    queryFn: ({ pageParam }) =>
      getAnime({ type, page: pageParam, order_by: "popularity" }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeByGenre(genre: string, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-genre", genre],
    queryFn: ({ pageParam }) =>
      getAnime({ genres: genre, page: pageParam, order_by: "popularity" }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeUpdates(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-updates"],
    queryFn: ({ pageParam }) =>
      getAnime({ page: pageParam, order_by: "popularity" }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeOngoing(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-ongoing"],
    queryFn: ({ pageParam }) =>
      getAnime({ status: "airing", page: pageParam, order_by: "popularity" }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeRecent(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ["anime-recent"],
    queryFn: ({ pageParam }) =>
      getAnime({ page: pageParam, order_by: "favorites" }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.has_next_page ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeUpcoming(enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-upcoming"],
    queryFn: () => getAnime({ status: "upcoming", order_by: "popularity" }),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

export function useAnimeCompleted(enabled?: boolean) {
  return useQuery({
    queryKey: ["anime-completed"],
    queryFn: () => getAnime({ status: "complete", order_by: "popularity" }),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    enabled,
  });
}
