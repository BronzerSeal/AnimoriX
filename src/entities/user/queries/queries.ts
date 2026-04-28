"use client";
import { useQuery } from "@tanstack/react-query";
import { GetUserBookmarksById } from "../model/get-user-bookmarks-by-id";

export const useBookmarks = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => GetUserBookmarksById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data.bookmarks;
    },
    enabled,
  });
};
