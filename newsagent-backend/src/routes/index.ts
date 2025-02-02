import { articleRoutes } from "./articles";
import { loginRoutes } from "./auth/login";
import { signUpRoutes } from "./auth/signup";
import { feedsRoutes } from "./feeds";
import { searchRoute } from "./search";

export const routes = () => {
  feedsRoutes();
  articleRoutes();
  searchRoute();
  loginRoutes();
  signUpRoutes();
};
