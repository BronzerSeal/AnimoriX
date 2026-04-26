"use server";
import prisma from "@/utils/prisma";
import { bookmark } from "@/shared/types/DataBase";

type GetBookmarkSuccess = {
  status: "success";
  code: 200;
  bookmarks: bookmark[];
};

type GetBookmarkError = {
  status: "error";
  message: string;
};

export type GetBookmarksResponse = GetBookmarkSuccess | GetBookmarkError;

export const GetUserBookmarksById = async (
  userId: string,
): Promise<GetBookmarksResponse> => {
  try {
    const bookmarks = await (prisma.bookmarks.findMany as any)({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { code: 200, status: "success", bookmarks };
  } catch (error) {
    console.error("Error finding bookmarks:", error);
    return {
      status: "error",
      message: `Error finding bookmarks: ${error instanceof Error ? error.message : error}`,
    };
  }
};
