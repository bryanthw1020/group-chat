import { Middleware } from "@nuxt/types";

const guest: Middleware = ({ store, redirect }) => {
  if (!store.getters.isLoggedIn) {
    return;
  }

  redirect("chat");
};

export default guest;
