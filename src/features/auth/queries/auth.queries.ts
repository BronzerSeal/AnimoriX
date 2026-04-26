"use client";
import { useQuery } from "@tanstack/react-query";
import { GetUserInfoById } from "../model/actions/get-user-info-by-id";
import { getUserInfo } from "../model/actions/get-user-info";

export const UseUserInfoById = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["user-info", userId],
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

export const UseUserInfo = (
  userId: string,
  userName: string,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: ["user-info", userId, userName],
    queryFn: () => getUserInfo(userId, userName),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data;
    },
    enabled,
  });
};
