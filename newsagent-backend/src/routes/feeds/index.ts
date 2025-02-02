import { categoryFeeds } from "./category";
import { latestFeeds } from "./latest";

export const feedsRoutes = () => {
  latestFeeds();
  categoryFeeds();
};
