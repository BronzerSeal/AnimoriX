"use client";
import { UseUserInfoById } from "@/features/auth";
import { useParams } from "next/navigation";
import UserSidebar from "./user-sidebar";

const ProfilePage = () => {
  const { userId } = useParams() as { userId: string };
  const user = UseUserInfoById(userId, !!userId);

  if (userId === undefined) return <p>Loading</p>;

  return (
    <main className="w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)]" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto w-full max-w-[900px] max-w-425 mt-25 px-5">
        <h1 className="text-xl font-bold mb-2">ME</h1>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="font-semibold">Activities</h1>
            <p>
              2 minutes ago BronzerSeal watched EP 1 of Steel Ball Run: JoJo's
              Bizarre Adventure
            </p>
          </div>
          <UserSidebar />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
