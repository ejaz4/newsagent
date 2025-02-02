import parser from "rss-parser";
import { api } from "..";
import { db } from "./db";

export const fetchRss = async (url: string) => {
  const worker = new parser();

  const feed = await worker.parseURL(url);

  // get or create the source
  const source = await db.source.upsert({
    where: {
      rssFeed: url,
    },
    create: {
      name: feed.title || "News source",
      rssFeed: url,
      favicon: feed.image?.url || null,
    },
    update: {
      rssFeed: url,
      favicon: feed.image?.url || null,
    },
  });

  for (const item of feed.items) {
    const title = item.title;
    const description = item.content ? item.content : item.contentSnippet;
    const publishedAt = item.pubDate
      ? new Date(Date.parse(item.pubDate))
      : null;

    const domainName = item.link ? new URL(item.link).hostname : null;

    await db.articleSource.upsert({
      where: {
        articleUrl: item.link,
      },
      create: {
        articleTitle: title,
        articleDescription: description,
        articlePublishedAt: publishedAt,
        articleUrl: item.link,
        sourceIdentifier: domainName,

        Source: {
          connect: {
            id: source.id,
          },
        },
      },
      update: {
        articleTitle: title,
        articleDescription: description,
        articlePublishedAt: publishedAt,
        articleUrl: item.link,
        sourceIdentifier: domainName,

        Source: {
          connect: {
            id: source.id,
          },
        },
      },
    });
  }
};
