"use client";
import { Skeleton } from "@/app/_components/skeleton";
import { useCreateArticle } from "@/app/libs/useCreateArticle";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const CreateArticlePage = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [articleId, error] = useCreateArticle(url);
  const splashText = [
    "Bringing you closer to the middle of the story...",
    "Removing the fluff from the news...",
    "Getting to the point...",
    "Finding only the stuff that matters...",
  ];
  const router = useRouter();

  useEffect(() => {
    if (!articleId) return;

    router.push(`/article/${articleId.articleId}`);
  }, [articleId]);

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      router.back();
    }, 3000);
  }, [error]);

  return (
    <div className="content topPadding">
      {!error && <p>Bringing you closer to the middle of the story...</p>}
      {error && <p>This type of story can&apos;t be made.</p>}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Skeleton width={"80%"} height={28} rainbow />
        <Skeleton width={"100%"} height={28} rainbow />
      </div>

      <Skeleton width={"100%"} height={400} rainbow />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Skeleton width={"100%"} height={24} count={10} rainbow />
      </div>
    </div>
  );
};

export default CreateArticlePage;
