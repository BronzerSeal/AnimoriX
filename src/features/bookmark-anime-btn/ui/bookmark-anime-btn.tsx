import { Button } from "@/shared/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { UseToggleBookmark } from "../queries/queries";
import { useSession } from "next-auth/react";
import { useBookmarks } from "@/entities/user/queries/queries";
import { toast } from "sonner";

const BookmarkAnimeBtn = ({
  animeId,
  animeName,
  size = 12,
}: {
  animeId: number;
  animeName: string;
  size?: number;
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

  const handleClick = () => {
    if (!session?.user?.id) {
      toast.error("Please log in to add bookmarks");
      return;
    }

    mutate({ userId: session?.user.id!, animeId, animeName });
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleClick}
      className={`h-${size} w-${size} rounded-xl border-white/20 dark:bg-white/5 text-black dark:text-white `}
    >
      {isAlreadyAdded ? (
        <BookmarkCheck size={size} className="h-5 w-5" />
      ) : (
        <Bookmark size={size} className="h-5 w-5" />
      )}
    </Button>
  );
};

export default BookmarkAnimeBtn;
