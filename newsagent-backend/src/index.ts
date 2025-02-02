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

const main = async () => {
  await fetchRss("https://feeds.bbci.co.uk/news/rss.xml");
  await fetchRss("https://feeds.skynews.com/feeds/rss/home.xml");
  await fetchRss("https://www.theguardian.com/uk/rss");
  await fetchRss("http://rss.cnn.com/rss/edition_world.rss");
  await fetchRss("https://www.cnbc.com/id/100727362/device/rss/rss.html");
  await fetchRss("https://abcnews.go.com/abcnews/internationalheadlines");
  await fetchRss("https://www.aljazeera.com/xml/rss/all.xml");
  await fetchRss("https://www.independent.co.uk/news/world/rss");
  await fetchRss("https://openrss.org/www.thetimes.com");
  await fetchRss("https://www.telegraph.co.uk/news/rss.xml");
  await fetchRss("https://www.ft.com/?format=rss");
  await fetchRss(
    "https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best"
  );

  while (true) {
    try {
      console.log(await generateArticles());
      await setTimeout(1000 * 60 * 5);
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
