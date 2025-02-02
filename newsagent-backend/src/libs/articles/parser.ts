import { db } from "../db";

export const parseArticle = async (intermediateId: string) => {
  const articleSource = await db.articleSource.findUnique({
    where: {
      id: intermediateId,
    },
  });
};
