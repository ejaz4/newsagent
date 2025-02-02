"use client";
import { useFeed } from "@/app/libs/useFeed";
import styles from "./feed.module.css";
import Link from "next/link";
import { Skeleton } from "../skeleton";

export const StarFeed = ({ channel }: { channel: string }) => {
  const feed = useFeed(channel);

  if (!feed) {
    return (
      <div className={styles.feed}>
        <div className={styles.starItem}>
          <Skeleton width={"100%"} height={300} />
          <Skeleton width={"60%"} height={24} />
        </div>

        <div className={styles.feedRoll}>
          <div className={styles.feedRollInner}>
            <p>Up next</p>
            <div className={styles.miniItem}>
              <Skeleton width={"100%"} height={24} count={1} bottomMargin />
              <Skeleton width={"60%"} height={24} count={1} />
            </div>

            <div className={styles.miniItem}>
              <Skeleton width={"100%"} height={24} count={1} bottomMargin />
              <Skeleton width={"60%"} height={24} count={1} />
            </div>

            <div className={styles.miniItem}>
              <Skeleton width={"100%"} height={24} count={1} bottomMargin />
              <Skeleton width={"60%"} height={24} count={1} />
            </div>
          </div>
          {/* <div>
            <a href="/feeds/latest">See more</a>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      {feed.map((item, index) => {
        if (index == 0) {
          return (
            <Link
              href={`/article/${item.id}`}
              key={item.id}
              className={styles.starItem}
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
          );
        }
      })}

      <div className={styles.feedRoll}>
        <div className={styles.feedRollInner}>
          {feed.map((item, index) => {
            if (index > 4) {
              return;
            }
            if (index != 0) {
              return (
                <Link
                  href={`/article/${item.id}`}
                  className={styles.miniItem}
                  key={item.id}
                >
                  <h3>{item.headline}</h3>
                </Link>
              );
            }
          })}
        </div>
        <div>
          <a href="/feeds/latest">See more</a>
        </div>
      </div>
    </div>
  );
};
