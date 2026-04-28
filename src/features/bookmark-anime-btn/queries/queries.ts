"use client";
import { bookmark } from "@/shared/types/DataBase";
import { useMutation } from "@tanstack/react-query";
import { bookmarkRequest } from "../model/bookmark-request";
import { queryClient } from "@/utils/query-client";

type ToggleBookmarkVariables = {
  userId: string;
  animeId: number;
  animeName: string;
};

type BookmarksQueryData =
  | {
      status: "success";
      code: 200;
      bookmarks: bookmark[];
    }
  | {
      status: "error";
      message: string;
    };

type ToggleBookmarkContext = {
  previousBookmarks?: BookmarksQueryData;
};

const createOptimisticBookmark = ({
  userId,
  animeId,
  animeName,
}: ToggleBookmarkVariables): bookmark => ({
  id: `optimistic-${userId}-${animeId}`,
  userId,
  animeId,
  animeName,
  createdAt: new Date(),
});

export const UseToggleBookmark = () => {
  return useMutation({
    mutationKey: ["bookmark-request"],
    mutationFn: async ({
      userId,
      animeId,
      animeName,
    }: ToggleBookmarkVariables) => {
      const response = await bookmarkRequest(userId, animeId, animeName);

      if (response.status === "error") {
        throw new Error(response.message);
      }

      return response;
    },

    onMutate: async (
      variables: ToggleBookmarkVariables,
    ): Promise<ToggleBookmarkContext> => {
      const queryKey = ["bookmarks", variables.userId] as const;

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousBookmarks =
        queryClient.getQueryData<BookmarksQueryData>(queryKey);

      queryClient.setQueryData<BookmarksQueryData>(queryKey, (old) => {
        const currentBookmarks =
          old?.status === "success" ? old.bookmarks : [];

        const isAlreadyBookmarked = currentBookmarks.some(
          (bookmark) => bookmark.animeId === variables.animeId,
        );

        const nextBookmarks = isAlreadyBookmarked
          ? currentBookmarks.filter(
              (bookmark) => bookmark.animeId !== variables.animeId,
            )
          : [...currentBookmarks, createOptimisticBookmark(variables)];

        return {
          status: "success",
          code: 200,
          bookmarks: nextBookmarks,
        };
      });

      return { previousBookmarks };
    },

    onError: (_error, variables, context) => {
      const queryKey = ["bookmarks", variables.userId] as const;

      if (context?.previousBookmarks) {
        queryClient.setQueryData(queryKey, context.previousBookmarks);
        return;
      }

      queryClient.removeQueries({ queryKey, exact: true });
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", variables.userId],
      });
    },
  });
};
