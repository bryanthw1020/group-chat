<template>
  <div id="pages__chat" class="py-0 py-sm-6">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8">
        <v-card>
          <div class="chat__head">
            <v-card-title class="justify-center pb-2">
              Fun Group Chat
            </v-card-title>

            <p class="text-truncate text-center mb-0">
              {{ userEmail }}
            </p>

            <div class="pa-4 text-center">
              <v-btn @click="logout" depressed rounded small>
                <v-icon left>mdi-logout</v-icon>
                Logout
              </v-btn>
            </div>

            <v-divider />
          </div>

          <pages-chat-message-list />

          <pages-chat-emoji-overlay />

          <pages-chat-message-form />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageChat",
  middleware: ["auth"],
  head() {
    return {
      title: "Chat",
    };
  },
  computed: {
    userEmail() {
      return this.$store.state.authUser.email || "Anonymous User";
    },
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#pages__chat {
  .chat__head {
    background-color: #fff;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 5;
  }
}
</style>