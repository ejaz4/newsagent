// // accepts array JSON with bunch of strings and gets added to favourite categories. save to db
// import { Type } from "@sinclair/typebox";
// import { api } from "../..";
// import { fetchOriginalContent } from "../../libs/articles/fetch";
// import { db } from "../../libs/db";
// import { generateArticles } from "../../libs/articles/cron";
// import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { verifyToken } from "../../libs/token";

// interface FastifyRequestWithUser extends FastifyRequest {
//   userId?: string;
// }

// // Middleware to check for bearer token
// const authenticate = async (
//   req: FastifyRequestWithUser,
//   res: FastifyReply,
//   done: Function
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send({
//       ok: false,
//       message: "Unauthorized",
//     });
//   }

//   const [userId, token] = authHeader.split(".");

//   const isValidToken = await verifyToken(userId, token);

//   if (!isValidToken) {
//     return res.status(401).send({
//       ok: false,
//       message: "Unauthorized",
//     });
//   }

//   // Proceed if token is valid
//   req.userId = userId; // Replace with actual user ID from token

//   done();
// };

// export const preferenceRoutes = () => {
//   api.post(
//     "/api/user/preferences",
//     {
//       schema: {
//         body: Type.Object({
//           categories: Type.Array(Type.String()),
//         }),
//         response: {
//           200: Type.Object({
//             ok: Type.Boolean(),
//           }),
//         },
//       },
//       preHandler: [authenticate],
//     },
//     async (req, res) => {
//       const { categories } = req.body;

//       // use categories to update user preferences

//       const categoryUpdate = await db.user.update({
//         where: {
//           id: req.userId,
//         },
//         data: {
//           favouriteCategories: categories,
//         },
//       });

//       if (!categoryUpdate) {
//         return res.status(400).send({
//           ok: false,
//         });
//       }

//       return res.status(200).send({
//         ok: true,
//       });
//     }
//   );
// };
