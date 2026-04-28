import { FC } from "react";
import { formatTimeAgo } from "../model/formatTimeAgo";
import { ThumbsUp } from "lucide-react";
import Synopsis from "@/shared/ui/synopsis";
import Link from "next/link";

interface CommentProps {
  comment: {
    userName: string;
    userImage: string;
    time: string;
    likes: number;
    text: string;
  };
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="mb-4 flex w-full items-start space-x-4">
      <Link href={`/user/jikanUser/profile?username=${comment.userName}`}>
        <img
          src={comment.userImage}
          alt={comment.userName}
          className="w-10 h-10 rounded-full shrink-0"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/user/jikanUser/profile?username=${comment.userName}`}>
          <h3 className="font-bold">{comment.userName}</h3>
          <p className="text-sm text-gray-500">{formatTimeAgo(comment.time)}</p>
        </Link>
        <Synopsis text={comment.text} />
        <p className="flex gap-1 text-gray-400 text-sm">
          {comment.likes} <ThumbsUp size={15} />
        </p>
      </div>
    </div>
  );
};

export default Comment;
