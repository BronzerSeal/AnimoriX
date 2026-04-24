"use client";
import { useMutation } from "@tanstack/react-query";
import { bookmarkRequest } from "../model/bookmark-request";
import { queryClient } from "@/utils/query-client";

export const UseToggleBookmark = () => {
  return useMutation({
    mutationKey: ["bookmark-request"],
    mutationFn: ({
      userId,
      animeId,
      animeName,
    }: {
      userId: string;
      animeId: number;
      animeName: string;
    }) => bookmarkRequest(userId, animeId, animeName),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", variables.userId],
      });
    },
  });
};
