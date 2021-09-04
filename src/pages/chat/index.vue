<template>
  <div id="pages_chat">
    Chat Page

    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageChat",
  middleware: ["auth"],
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