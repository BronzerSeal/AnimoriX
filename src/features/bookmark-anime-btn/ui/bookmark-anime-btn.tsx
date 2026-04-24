import { Button } from "@/shared/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { UseToggleBookmark } from "../queries/queries";
import { useSession } from "next-auth/react";
import { useBookmarks } from "@/entities/user/queries/queries";

const BookmarkAnimeBtn = ({
  animeId,
  animeName,
}: {
  animeId: number;
  animeName: string;
}) => {
  const { data: session } = useSession();
  const { mutate } = UseToggleBookmark();

  const { data: bookmarks } = useBookmarks(
    session?.user.id!,
    !!session?.user.id,
  );

  const isAlreadyAdded = bookmarks?.some(
    (bookmark) => bookmark.animeId === animeId,
  );
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => mutate({ userId: session?.user.id!, animeId, animeName })}
      className="h-12 w-12 rounded-xl border-white/20 dark:bg-white/5 text-black dark:text-white "
    >
      {isAlreadyAdded ? (
        <BookmarkCheck className="h-5 w-5" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </Button>
  );
};

export default BookmarkAnimeBtn;
