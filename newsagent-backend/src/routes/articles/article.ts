import { api } from "../..";
import { db } from "../../libs/db";

export const articleRoute = () => {
  api.get("/api/article/:id", async (req, res) => {
    const { id } = req.params as { id: string };

    const article = await db.article.findUnique({
      where: {
        id,
      },
      include: {
        sources: {
          select: {
            id: true,
            articleDescription: true,
            articleTitle: true,
            articleUrl: true,
            sourceIdentifier: true,
            Source: {
              select: {
                id: true,
                rssFeed: true,
                name: true,
                favicon: true,
              },
            },
            articleImage: true,
          },
        },
      },
    });

    if (!article) {
      return res.status(404).send({
        message: "Article not found",
      });
    }

    return res.status(200).send(article);
  });
};
