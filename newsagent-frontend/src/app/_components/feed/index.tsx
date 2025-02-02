"use client";
import { useFeed } from "@/app/libs/useFeed";
import styles from "./feed.module.css";
import { Skeleton } from "../skeleton";
import Link from "next/link";

export const Feed = ({ channel }: { channel: string }) => {
  const feed = useFeed(channel);

  if (!feed) {
    return (
      <div className={styles.feed}>
        {[...Array(8)].map((item, index) => (
          <div className={styles.item} key={index}>
            <Skeleton width={200} height={200} />

            <Skeleton width={"100%"} height={24} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      {feed.map((item) => (
        <Link
          href={`/article/${item.id}`}
          className={styles.item}
          key={item.id}
        >
          <img
            src={item.articleImage || "/images/no-image.png"}
            alt=""
            onError={(e) => {
              {
                e.currentTarget.src = "/images/no-image.png";
              }
            }}
          />
          <h2>{item.headline}</h2>
        </Link>
      ))}
    </div>
  );
};
