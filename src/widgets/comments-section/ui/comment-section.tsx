"use client";
import Comment from "@/entities/comments";
import { mapComment } from "../model/map-comment";
import { CommentSectionSkeleton } from "./comment-section-skeleton";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useAnimeComment } from "@/entities/anime";
import { useTranslations } from "next-intl";

const CommentSection = ({ animeId }: { animeId: number }) => {
  const t = useTranslations("watch-page");
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useAnimeComment(animeId, !!animeId);
  if (isLoading) return <CommentSectionSkeleton />;

  // @ts-ignore
  const isError = data?.[0]?.status === 500;

  if (data?.[0]?.data?.length === 0) return <p>{t("not-yet")}</p>;
  const comments = data?.flatMap((page) => page.data) ?? [];
  return (
    <section className="w-full">
      <div className="flex gap-2">
        <h1 className="text-xl font-bold mb-2">{t("comments")}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? t("on") : t("off")}
        </Button>
      </div>
      {isOpen &&
        !isError &&
        comments.map((comment) => (
          <Comment key={comment?.mal_id} comment={mapComment(comment)} />
        ))}
      {isError && <p className="text-xl mb-2">{t("comment-error")}</p>}
      {isOpen && !isError && (
        <Button
          variant="outline"
          size="lg"
          className="mb-3 w-full"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {hasNextPage ? t("load-more") : t("no-more")}
        </Button>
      )}
    </section>
  );
};

export default CommentSection;
