import { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = () => ({
  authUser: null as any
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  isLoggedIn: state => {
    try {
      return state.authUser && state.authUser.uid !== null;
    } catch {
      return false;
    }
  }
};

export const mutations: MutationTree<RootState> = {
  RESET_STORE: state => {
    state.authUser = null;
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    };
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, ctx) {
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      await dispatch("onAuthStateChanged", {
        authUser,
        claims
      });
    }
  },

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit("RESET_STORE");

      this.$router.push("/");
      return;
    }

    if (authUser && authUser.getIdToken) {
      try {
        await authUser.getIdToken(true);

        this.$router.push("chat");
      } catch (e) {
        console.error(e);
      }
    }

    commit("SET_AUTH_USER", { authUser });
  }
};
