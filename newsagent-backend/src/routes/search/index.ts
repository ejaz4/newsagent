import { Type } from "@sinclair/typebox";
import { api } from "../..";
import { useSearch } from "../../libs/search";

export const searchRoute = () => {
  api.get(
    "/api/search",
    {
      schema: {
        response: {
          200: Type.Array(
            Type.Object({
              title: Type.String(),
              description: Type.String(),
              url: Type.String(),
            })
          ),
          "4xx": Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async (req, res) => {
      const { query } = req.query as { query: string };

      if (!query) {
        return res.status(400).send({ message: "Query is required" });
      }

      const results = await useSearch(`News about ${query}`);

      return res.status(200).send(results);
    }
  );
};
