import { api } from "../..";
import { Type } from "@sinclair/typebox";
import bcrypt from "bcrypt";
import { db } from "../../libs/db";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const signUpRoutes = () => {
  api.post(
    "/api/auth/signup",
    {
      schema: {
        body: Type.Object({
          email: Type.String(),
          name: Type.String(),
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
      const { email, name, password } = req.body;

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Save user to the database
      try {
        await db.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return res.status(400).send({
              message: "Email already exists",
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
