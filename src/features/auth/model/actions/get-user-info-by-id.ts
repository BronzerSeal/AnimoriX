"use server";
import prisma from "@/utils/prisma";

export const GetUserInfoById = async (userId: string) => {
  try {
    const user = await (prisma.user.findUnique as any)({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
    return { code: 200, user };
  } catch (error) {
    console.error("Error finding user:", error);
    return {
      error: `Error finding user: ${error instanceof Error ? error.message : error}`,
    };
  }
};
