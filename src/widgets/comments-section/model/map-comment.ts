export const mapComment = (comment: any) => ({
  userName: comment.user?.username || "Unknown User",
  userImage:
    comment.user?.images?.jpg?.image_url ||
    comment.user?.images?.webp?.image_url ||
    "",
  time: comment.date || "",
  likes: comment.reactions?.overall || 0,
  text: comment.review || "",
});
