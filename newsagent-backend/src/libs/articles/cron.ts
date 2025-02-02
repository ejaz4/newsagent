import { generateObject, generateText } from "ai";
import { db } from "../db";
import { crawler } from "./crawler";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { anthropic } from "@ai-sdk/anthropic";

export const generateArticles = async (intermediateId?: string | null) => {
  console.log("M1: Generating articles...");

  let unProcessedArticles;

  if (!intermediateId) {
    unProcessedArticles = (
      await db.articleSource.findMany({
        where: {
          isProcessed: false,
        },
        take: 3,
      })
    ).map((article) => article.id);
  } else {
    unProcessedArticles = [intermediateId];
  }

  console.log("S1: Collected unprocessed articles. Got: ", unProcessedArticles);
  let processedArticleIds;

  for (const articleId of unProcessedArticles) {
    console.log("S2: Crawling", articleId);
    const similarArticles = await crawler(articleId);

    if (!similarArticles) continue;

    console.log(
      "S3: Crawled",
      articleId,
      "Found",
      similarArticles[0].length,
      "similar articles"
    );

    // Put the articles all through ChatGPT

    const newArticle = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        title: z.string(),
        content: z.string(),
        misinformationScores: z.array(z.number().multipleOf(0.01)),
      }),
      prompt:
        "Generate an unbiased, long and neutral news article based on the following articles, it must be news and not anything irrelevant, also give a misinformation score for each in order (between 0 and 1):\n\n" +
        similarArticles[0].map((article) => article).join("\n"),
    });

    const articleGenre = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        category: z.string(),
      }),
      prompt:
        "Generate the genre of the article based on the following articles, choose from Sport, Business, Technology, Science, Environment, Politics, Society, Crime or World:\n\n" +
        similarArticles,
    });

    const articleSourceIds = similarArticles[1];

    const generatedArticle = await db.article.create({
      data: {
        headline: newArticle.object.title,
        content: newArticle.object.content,

        category: articleGenre.object.category,

        sources: {
          connect: articleSourceIds.map((id) => ({ id })),
        },
      },
    });

    let item = 0;
    for (const articleSourceId of articleSourceIds) {
      await db.articleSource.update({
        where: {
          id: articleSourceId,
        },
        data: {
          isProcessed: true,
          misinfoScore: newArticle.object.misinformationScores[item],
        },
      });
      item++;
    }

    processedArticleIds = generatedArticle.id;
    console.log("S4: Generated article");
  }

  return processedArticleIds;
};
