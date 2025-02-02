// import { extractFromHtml } from "@extractus/article-extractor";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const fetchOriginalContent = async (url: string) => {
  const request = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      Priority: "u=0, i",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
  });

  if (!request.ok) {
    throw new Error("Failed to fetch the article");
  }

  const rawBody = await request.text();

  const dom = new JSDOM(rawBody, {
    url: url,
  });

  const metas = dom.window.document.querySelectorAll("meta");

  let imageUrl = "";
  let publishDate = "";

  for (const metaTag of metas) {
    if (metaTag.getAttribute("property") === "og:image") {
      imageUrl = metaTag.getAttribute("content") || "";
    }
  }

  const reader = new Readability(dom.window.document);

  let article = reader.parse();

  return {
    title: article?.title,
    description: article?.excerpt,
    content: article?.content,
    date: article?.publishedTime,
    imageUrl: imageUrl,
  };
};
