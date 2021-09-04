import { Middleware } from "@nuxt/types";

const auth: Middleware = ({ store, redirect }) => {
  if (store.getters.isLoggedIn) {
    return;
  }

  redirect("/");
};

export default auth;
