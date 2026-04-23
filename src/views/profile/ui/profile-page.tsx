"use client";
import { UseUserInfoById } from "@/features/auth";
import { useParams } from "next/navigation";
import UserSidebar from "./user-sidebar";
import Activities from "./activities";
import UserSection from "./user-section";

const ProfilePage = () => {
  const { userId } = useParams() as { userId: string };
  const { data: user, isLoading } = UseUserInfoById(userId, !!userId);
  // console.log(user);

  if (isLoading) return <p>Loading</p>;

  if (!user) return <p>No user found</p>;

  return (
    <main className="w-full">
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)] bg-[radial-gradient(circle_at_top_right,rgba(154,132,238,0.18),transparent_32%)]" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto w-full max-w-[900px] max-w-425 mt-25 px-5">
        <UserSection user={user} />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] pt-5">
          <Activities />
          <UserSidebar />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
