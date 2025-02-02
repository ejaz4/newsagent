import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fetchRss } from "./libs/rss";
import { generateArticles } from "./libs/articles/cron";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { setTimeout } from "timers/promises";

export const api = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const rss = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://feeds.skynews.com/feeds/rss/home.xml",
  "https://www.theguardian.com/uk/rss",
  "http://rss.cnn.com/rss/edition_world.rss",
  "https://www.cnbc.com/id/100727362/device/rss/rss.html",
  "https://abcnews.go.com/abcnews/internationalheadlines",
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://www.independent.co.uk/news/world/rss",
  "https://www.telegraph.co.uk/news/rss.xml",
  "https://www.ft.com/?format=rss",
  "https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best",
]

const main = async () => {
  for (const url of rss) {
    try {
      await fetchRss(url);
    } catch (e) {
      console.error(e);
    }
  }

  while (true) {
    try {
      console.log(await generateArticles());
      await setTimeout(5000);
    } catch (e) {
      console.error(e);
    }
  }
};

const startWs = async () => {
  await api.register(cors, {
    origin: process.env.UI_HOST,
  });

  await routes();

  api.listen({
    port: (process.env.PORT as number) || 3000,
  });
};

main();
startWs();
