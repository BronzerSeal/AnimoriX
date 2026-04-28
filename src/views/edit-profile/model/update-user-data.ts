"use server";

import prisma from "@/utils/prisma";

export const updateUserData = async (
  userId: string,
  email: string,
  name: string,
) => {
  if (!userId || !email || !name) {
    return {
      status: "error",
      message: "No data Provided",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
      },
    });
    return { code: 200, status: "success", user };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      status: "error",
      message: `Error updating user: ${error instanceof Error ? error.message : error}`,
    };
  }
};
