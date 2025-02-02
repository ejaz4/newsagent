"use client";
import { useArticle } from "@/app/libs/useArticle";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import styles from "./article.module.css";
import { SourcePill } from "@/app/_components/sourcePill";
import { CombineIcon } from "lucide-react";
import { Feed } from "@/app/_components/feed";
import { Skeleton } from "@/app/_components/skeleton";
import { error } from "console";

const ArticlePage = () => {
  const {
    article,
  }: {
    article: string;
  } = useParams();

  const articleData = useArticle(article);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [currentArticle, setCurrentArticle] = useState<string | number | null>(
    null
  );
  const [currentHeadline, setCurrentHeadline] = useState<string | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    if (articleData) {
      setCurrentArticle(articleData.id);
      setCurrentHeadline(articleData.headline);
      setCurrentDescription(articleData.content);
    }

    console.log(articleData);
    articleData?.sources.forEach((source) => {
      if (source.articleImage) {
        setFeaturedImage(source.articleImage);
      }
    });
  }, [articleData]);

  if (!articleData) {
    return (
      <div className="content topPadding">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Skeleton width={"80%"} height={28} />
          <Skeleton width={"100%"} height={28} />
        </div>

        <Skeleton width={"100%"} height={400} />

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Skeleton width={"100%"} height={24} count={10} />
        </div>
      </div>
    );
  }

  return (
    <div className="content topPadding">
      <h1>{articleData?.headline}</h1>
      <div className={styles.pillStrip}>
        <CombineIcon size={16} />
        {articleData?.sources.map((source, index) => {
          if (source.Source) {
            return (
              <SourcePill
                key={source.sourceIdentifier}
                name={source.Source.name}
                active={currentArticle === index}
                favicon={source.Source.favicon}
                onclick={() => {
                  window.open(source.articleUrl, "_blank");
                }}
              />
            );
          } else {
            return (
              <SourcePill
                key={source.sourceIdentifier}
                name={source.sourceIdentifier}
                active={currentArticle === index}
                onclick={() => {
                  window.open(source.articleUrl, "_blank");
                }}
              />
            );
          }
        })}
      </div>
      {featuredImage && (
        <img className={styles.image} src={featuredImage} alt="" />
      )}
      <div className={styles.articleContent}>
        {articleData?.content?.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.moreLike}>
        <h1>More like this</h1>
        <Feed channel={`@category/${articleData.category}`} />
      </div>
    </div>
  );
};

export default ArticlePage;
