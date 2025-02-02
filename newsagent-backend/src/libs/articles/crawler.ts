import { db } from "../db";
import { useSearch } from "../search";
import { ResultType } from "../search/type";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { fetchOriginalContent } from "./fetch";
import { z } from "zod";
import { anthropic } from "@ai-sdk/anthropic";

// Crawl, validate and find similar articles
export const crawler = async (intermediateId: string) => {
  const articleSource = await db.articleSource.findUnique({
    where: {
      id: intermediateId,
    },
  });

  if (!articleSource) return;

  if (articleSource.isProcessed) {
    return;
  }

  const headline = articleSource.articleTitle as string;
  const dateTime = articleSource.articlePublishedAt;

  const articles = (await useSearch(headline)).slice(0, 4);

  let acceptedArticles: ResultType[] = [
    {
      title: articleSource.articleTitle!!,
      description: articleSource.articleDescription || "",
      url: articleSource.articleUrl!!,
    },
  ];

  for (const article of articles) {
    if (article.title == headline) {
      continue;
    }

    const baseTitle = articleSource.articleTitle;
    const title = article.title;

    // Check if the article is similar
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        isSimilar: z.boolean(),
        isNews: z.boolean(),
      }),
      prompt: `Compare the following article titles and determine:
        1. If they describe the same story (isSimilar).
        2. If they are actually news articles content (isNews).
      
        Title 1: "${baseTitle}"  
        Title 2: "${title}"`,
    });

    const formattedResponse = object;

    if (!formattedResponse) {
      continue;
    }

    if (!formattedResponse.isNews || !formattedResponse.isSimilar) {
      continue;
    }

    acceptedArticles.push(article);
  }

  let articleContents = [];
  let articleSources = [];

  // Process all the articles.
  for (const article of acceptedArticles) {
    try {
      const articleFetched = await fetchOriginalContent(article.url);

      if (articleFetched.date) {
        const fetchedDate = new Date(articleFetched.date);

        // if (!articleFetched.date) continue;
        // Check if the article's date is within the range of the original article
        if (
          articleFetched.date &&
          dateTime &&
          Math.abs(fetchedDate.getTime() - dateTime.getTime()) >
            1000 * 60 * 60 * 24 * 5
        ) {
          continue;
        }
      }

      const domainName = article.url ? new URL(article.url).hostname : null;
      let date = null;

      try {
        date = new Date(articleFetched.date!!);
      } catch (e) {}

      try {
        const aSource = await db.articleSource.upsert({
          where: {
            articleUrl: article.url,
          },
          create: {
            articleTitle: article.title,
            articleDescription: articleFetched.description,
            articlePublishedAt: date,
            articleUrl: article.url,
            articleImage: articleFetched.imageUrl,
            isProcessed: true,
            sourceIdentifier: domainName,
          },
          update: {
            articleTitle: article.title,
            articleDescription: articleFetched.description,
            articlePublishedAt: date,
            articleUrl: article.url,
            articleImage: articleFetched.imageUrl,
            isProcessed: true,
            sourceIdentifier: domainName,
          },
        });
        articleSources.push(aSource.id);
      } catch (e) {
        console.log(e);
      }

      articleContents.push(articleFetched.content);
    } catch (e) {
      console.log(e);
      continue;
    }
  }

  return [articleContents, articleSources];
};
