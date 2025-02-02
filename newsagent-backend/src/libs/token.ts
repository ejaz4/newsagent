import { FastifyRequest } from "fastify";
import crypto from "crypto";
import { db } from "../libs/db";

export const generateToken = async (userId: string) => {
  // Generate a token for the user
  const randomBytes = crypto.randomBytes(32).toString("hex");
  // append user id to end of token so we do not have to repeatedly do queries
  const finalToken = `${randomBytes}.${userId}`;

  // Save the token to the database
  await db.userTokens.create({
    data: {
      token: randomBytes,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return randomBytes;
};

export const verifyToken = async (userId: string, token: string) => {
  // Verify the token

  const userTokens = await db.userTokens.findUnique({
    where: {
      token,
      userId,
    },
  });

  return userTokens ? true : false;
};
