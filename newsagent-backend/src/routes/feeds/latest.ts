import { Article } from "@prisma/client";
import { api } from "../..";
import { db } from "../../libs/db";

export const latestFeeds = () => {
  api.get("/api/feeds/latest", async (req, res) => {
    const feeds = await db.articleSource.findMany({
      where: {
        isProcessed: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        articleImage: true,
        Article: true,
      },
      take: 50,
    });

    let articlesDone: string[] = [];
    let mainArticles: Partial<Article> & { articleImage?: string | null }[] =
      [];

    for (const feed of feeds) {
      if (!feed.Article) {
        continue;
      }

      if (articlesDone.includes(feed.Article.id)) {
        continue;
      }

      articlesDone.push(feed.Article.id);
      mainArticles.push({ ...feed.Article, articleImage: feed.articleImage });
    }

    return res.status(200).send(mainArticles);
  });
};
