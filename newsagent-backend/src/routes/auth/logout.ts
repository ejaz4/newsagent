import { api } from "../..";
import { Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";
import { db } from "../../libs/db";
import { generateToken, verifyToken } from "../../libs/token";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const logoutRoutes = () => {
  api.post(
    "/api/auth/logout",
    {
      schema: {
        body: Type.Object({
          email: Type.String(),
          password: Type.String(),
        }),
        response: {
          200: Type.Object({
            token: Type.String(),
          }),
          "4xx": Type.Object({
            message: Type.String(),
          }),
          "5xx": Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email, password } = req.body;

      try {
        // Step 1: check if user exists

        // Step 2: if user exists, check if password is correct using comparesync and their hashed password

        // step 3: if the password is correct, generate a token and send it back to the user
        const user = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          return res.status(400).send({
            message: "User not found",
          });
        }

        const passwordMatch = await bcrypt.compareSync(
          password,
          user.password || ""
        );

        if (!passwordMatch) {
          return res.status(400).send({
            message: "Invalid password",
          });
        }

        // Generate token

        const sessionToken = await generateToken(user.id);
        if (sessionToken === "" || sessionToken === null) {
          return res.status(500).send({
            message: "Internal server error",
          });
        }

        return res.status(200).send({ token: sessionToken });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return res.status(400).send({
              // This is terrible for security through obscurity reasons but whatever
              message: "User not found",
            });
          }
        }

        return res.status(500).send({
          message: "Internal server error",
        });
      }
    }
  );
};
