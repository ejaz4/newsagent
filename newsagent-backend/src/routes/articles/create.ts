import { Type } from "@sinclair/typebox";
import { api } from "../..";
import { fetchOriginalContent } from "../../libs/articles/fetch";
import { db } from "../../libs/db";
import { generateArticles } from "../../libs/articles/cron";

export const createArticles = () => {
  api.post(
    "/api/create",
    {
      schema: {
        body: Type.Object({
          url: Type.String(),
        }),
        response: {
          200: Type.Object({
            id: Type.String(),
          }),
        },
      },
    },
    async (req, res) => {
      const url = req.body.url;

      const content = await fetchOriginalContent(url);

      let publishedAt;

      //   Get domain name
      const urlObject = new URL(url);
      const domain = urlObject.hostname;

      console.log(url);
      const source = await db.articleSource.upsert({
        where: {
          articleUrl: url,
        },
        create: {
          articleTitle: content.title,
          articleDescription: content.description,
          articleUrl: url,
          sourceIdentifier: domain,
        },
        update: {
          articleTitle: content.title,
          articleDescription: content.description,
          articleUrl: url,
          sourceIdentifier: domain,
        },
      });

      const article = await generateArticles(source.id);

      return res.status(200).send({
        id: article as string,
      });
    }
  );
};
