"use client";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "../model/update-user-data";
import { queryClient } from "@/utils/query-client";

export const UseUpdateUserInfo = (userId: string) => {
  return useMutation({
    mutationKey: ["update-user-info", userId],
    mutationFn: (data: { email: string; name: string }) =>
      updateUserData(userId, data.email, data.name),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-info", userId] }),
  });
};
