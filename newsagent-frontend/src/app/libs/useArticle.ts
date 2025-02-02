import { useEffect, useState } from "react";

export const useArticle = (id: string | null) => {
  const [article, setArticle] = useState<{
    id: string;
    headline: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    sources: {
      id: string;
      articleDescription: string;
      articleTitle: string;
      articleUrl: string;
      sourceIdentifier: string;
      articleImage?: string;
      Source: {
        id: string;
        name: string;
        rssFeed: string;
        favicon: string;
      };
    }[];
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.API_HOST}/api/article/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  }, [id]);

  return article;
};
