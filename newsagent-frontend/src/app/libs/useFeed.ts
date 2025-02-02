import { useEffect, useState } from "react";

export const useFeed = (name: string) => {
  const [feed, setFeed] = useState<
    | {
        id: string;
        headline: string;
        content: string | null;
        createdAt: Date;
        updatedAt: Date;
        articleImage?: string | null;
      }[]
    | null
  >(null);

  useEffect(() => {
    let base = `${process.env.API_HOST}/api/feeds/${name}`;

    if (name.startsWith("@category/")) {
      base = `${process.env.API_HOST}/api/feeds/category/${name.replace(
        "@category/",
        ""
      )}`;
    }

    fetch(base)
      .then((res) => res.json())
      .then((data) => {
        setFeed(data);
      });
  }, [name]);

  return feed;
};
