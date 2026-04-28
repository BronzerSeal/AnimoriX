import prisma from "@/utils/prisma";

export const getUserFromDb = async (email: string) => {
  return await (prisma.user.findUnique as any)({
    where: {
      email,
    },
  });
};
