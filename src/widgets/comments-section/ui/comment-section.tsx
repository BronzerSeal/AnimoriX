"use client";
import { useAnimeComment } from "@/entities/anime/queries/anime.queries";
import Comment from "@/entities/comments";
import { mapComment } from "../model/map-comment";
import { CommentSectionSkeleton } from "./comment-section-skeleton";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

const CommentSection = ({ animeId }: { animeId: number }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useAnimeComment(animeId, !!animeId);
  if (isLoading) return <CommentSectionSkeleton />;

  if (data?.[0]?.data?.length === 0) return <p>No comments yet.</p>;
  const comments = data?.flatMap((page) => page.data) ?? [];
  return (
    <section className="w-full">
      <div className="flex gap-2">
        <h1 className="text-xl font-bold mb-2">COMMENTS</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "ON" : "OFF"}
        </Button>
      </div>
      {isOpen &&
        comments.map((comment) => (
          <Comment key={comment?.mal_id} comment={mapComment(comment)} />
        ))}
      {isOpen && (
        <Button
          variant="outline"
          size="lg"
          className="mb-3 w-full"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {hasNextPage ? "Load More Comments" : "No More Comments"}
        </Button>
      )}
    </section>
  );
};

export default CommentSection;
