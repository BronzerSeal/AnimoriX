"use client";

import { signIn } from "next-auth/react";
import { isCreateByGoogle } from "../isCreateByGoogle";

export async function signInWithCredentials(email: string, password: string) {
  try {
    const createByGoogle = await isCreateByGoogle(email);
    if (createByGoogle) {
      return { error: "GOOGLE_ACCOUNT" };
    }
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return result;
  } catch (error) {
    console.error("Authorization error:", error);
    return { error: error };
  }
}
