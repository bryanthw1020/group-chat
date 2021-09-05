import { ActionTree, GetterTree, MutationTree } from "vuex";

import { RootState } from "~/store";
import emojiRegex from "emoji-regex/RGI_Emoji";

interface Emoji {
  name: string;
  size: number;
  duration: number;
  xPosition: number;
}

export const state = () => ({
  messages: [] as Array<any>,
  emojis: null as Array<Emoji> | null
});

export type ChatState = ReturnType<typeof state>;

export const getters: GetterTree<ChatState, RootState> = {
  //
};

export const mutations: MutationTree<ChatState> = {
  SET_MESSAGES: (state, messages) => {
    state.messages = messages;
  },
  SET_EMOJIS: (state, emojis) => {
    state.emojis = emojis;
  }
};

export const actions: ActionTree<ChatState, RootState> = {
  listenForNewMessages({ commit, dispatch }) {
    this.$fire.firestore
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        querySnapshot => {
          let messages: Array<any> = [];

          querySnapshot.forEach((message: any) => {
            messages.push({
              uid: message.id,
              ...message.data()
            });
          });

          commit("SET_MESSAGES", messages);

          if (messages.length) {
            dispatch("generateEmoji", messages[0]);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  },
  generateEmoji({ commit }, messageDoc: any) {
    let match;

    const regex = emojiRegex();
    const emojis: Array<Emoji> = [];

    while ((match = regex.exec(messageDoc.message))) {
      let i = 1;
      const quantity = Math.floor(Math.random() * 10) + 5;

      while (i <= quantity) {
        emojis.push({
          name: match[0],
          size: Math.floor(Math.random() * Math.floor(20)) + 20,
          duration: Math.floor(Math.random() * Math.floor(3000)) + 2000,
          xPosition: Math.floor(Math.random() * (30 - 1 + 1)) + 1
        });
        i++;
      }
    }

    commit("SET_EMOJIS", emojis);
  }
};
