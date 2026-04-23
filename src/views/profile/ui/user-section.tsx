import { UserFromDB } from "@/shared/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { formatJoinedDate } from "../model/format-join-date";

const UserSection = ({ user }: { user: UserFromDB }) => {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#efeefe] dark:bg-[#11161a] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] shadow-[0_20px_60px_white] backdrop-blur-sm">
      <div className="flex min-h-[80px] items-center gap-4 px-5 sm:gap-5 sm:px-6">
        <Avatar size="lg">
          <AvatarImage
            src={user?.image || undefined}
            alt="user avatar"
            className="grayscale"
          />
          <AvatarFallback>{user.email.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-[20px] font-black leading-none tracking-tight  sm:text-[24px]">
            {user.name || user.email || "No data"}
          </p>
          <p className="truncate text-sm font-semibold ">
            <span className="dark:text-gray-300 text-gray-500">Watching</span>{" "}
            JoJo&apos;s Bizarre Adventure: Golden Wind
          </p>
          <p className="text-xs font-semibold ">
            URL -{" "}
            <span className="dark:text-gray-300 text-gray-500">
              {formatJoinedDate(user.createdAt)}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
