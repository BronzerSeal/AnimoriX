import { bookmark } from "@/shared/types/DataBase";
import { MessageCirclePlus } from "lucide-react";
import { FC } from "react";
import { formatTimeAgo } from "../model/format-time-ago";
import { useTranslations } from "next-intl";

interface Props {
  bookmarks: bookmark[] | undefined;
  username: string;
}

const Activities: FC<Props> = ({ bookmarks, username }) => {
  const t = useTranslations("user");
  return (
    <section className="rounded-2xl">
      <h2 className="px-4 text-xl font-black sm:px-5">{t("activity")}</h2>

      <div className="space-y-4 px-4 pb-5 pt-6 sm:px-5">
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center gap-3 text-[12px] leading-tight dark:text-[#e1f2ff]"
            >
              <MessageCirclePlus size={16} color="#8eeec4" />

              <span className="text-[#8eeec4] shrink-0">
                {formatTimeAgo(bookmark.createdAt)}
              </span>

              <span className="font-bold">{username}</span>

              <span className="dark:text-[#a7bfd4] text-gray-500">
                {t("bookmark", { anime: bookmark.animeName })}
              </span>
            </div>
          ))
        ) : (
          <p>No activity yet</p>
        )}
      </div>
    </section>
  );
};

export default Activities;
