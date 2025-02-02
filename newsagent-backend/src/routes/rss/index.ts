import { api } from "../..";
import Type from "@sinclair/typebox";
import { db } from "../../libs/db";
import { fetchRss } from "../../libs/rss";

export const rssRoutes = () => {
  api.get(
    "/rss",
    {
      schema: {
        response: {
          200: Type.Object({
            headline: Type.String(),
          }),
        },
      },
    },
    async (req, res) => {
      // Handle route here
      const result = fetchRss("");
    }
  );
};
