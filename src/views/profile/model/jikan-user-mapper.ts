import { UserFromDB, userFromJikan } from "@/shared/types/DataBase";

export function mapJikanUser(user: userFromJikan): UserFromDB {
  return {
    id: `${user.data?.mal_id}`,
    email: "jikanUser@gmail.com",
    emailVerified: null,
    image:
      user.data?.images?.jpg?.image_url ??
      user.data?.images?.webp?.image_url ??
      "",
    name: user.data?.username ?? "",
    provider: "google",
    createdAt: user.data?.joined ? new Date(user.data.joined) : new Date(),
  };
}
