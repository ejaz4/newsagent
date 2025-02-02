import { useEffect, useState } from "react";

export const useCreateArticle = (url: string | null) => {
  const [article, setArticle] = useState<{
    articleId: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    fetch(`${process.env.API_HOST}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => {
        if (!res.ok) {
          return setError("Failed to create article");
        }
        return res.json();
      })
      .then((data: { id: string }) => {
        setArticle({
          articleId: data.id,
        });
      });
  }, [url]);

  return [article, error] as const;
};
