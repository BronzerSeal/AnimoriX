export interface UserFromDB {
  id: string;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  name: string;
  provider: "credentials" | "google";
  createdAt: Date;
}

export interface bookmark {
  id: string;
  userId: string;
  animeId: number;
  animeName: string;
  createdAt: Date;
}
