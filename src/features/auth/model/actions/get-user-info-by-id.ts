"use server";
import prisma from "@/utils/prisma";
import { UserFromDB } from "@/shared/types/DataBase";

type GetUserSuccess = {
  status: "success";
  code: 200;
  user: UserFromDB;
};

type GetUserError = {
  status: "error";
  message: string;
};

export type GetUserResponse = GetUserSuccess | GetUserError;

export const GetUserInfoById = async (
  userId: string,
): Promise<GetUserResponse> => {
  try {
    const user = await (prisma.user.findUnique as any)({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
    return { code: 200, status: "success", user };
  } catch (error) {
    console.error("Error finding user:", error);
    return {
      status: "error",
      message: `Error finding user: ${error instanceof Error ? error.message : error}`,
    };
  }
};
