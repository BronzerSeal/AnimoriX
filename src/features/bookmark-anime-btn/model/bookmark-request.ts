"use server";

import { bookmark } from "@/shared/types/DataBase";
import prisma from "@/utils/prisma";

type GetBookmarkSuccess = {
  status: "success";
  code: 200;
  bookmark: bookmark;
};

type GetBookmarkError = {
  status: "error";
  message: string;
};

type GetBookmarkResponse = GetBookmarkSuccess | GetBookmarkError;

export async function bookmarkRequest(
  userId: string,
  animeId: number,
  animeName: string,
): Promise<GetBookmarkResponse> {
  try {
    const existing = await (prisma.bookmarks.findUnique as any)({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    });

    if (existing) {
      await prisma.bookmarks.delete({
        where: { id: existing.id },
      });

      return {
        status: "success",
        code: 200,
        bookmark: existing,
      };
    }

    const newBookmark = await prisma.bookmarks.create({
      data: { userId, animeId, animeName },
    });

    return {
      code: 200,
      status: "success",
      bookmark: newBookmark,
    };
  } catch (error) {
    console.error("Error request bookmark:", error);
    return {
      status: "error",
      message: `Error request bookmark: ${error instanceof Error ? error.message : error}`,
    };
  }
}
