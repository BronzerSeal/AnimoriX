"use client";
import { useQuery } from "@tanstack/react-query";
import { GetUserInfoById } from "../model/actions/get-user-info-by-id";

export const UseUserInfoById = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["user-info-by-id", userId],
    queryFn: () => GetUserInfoById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data.user;
    },
    enabled,
  });
};
