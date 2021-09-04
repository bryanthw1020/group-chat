<template>
  <div class="components__messageList no-scrollbar">
    <pages-chat-message-list-item
      v-for="messageDoc in messages"
      :key="messageDoc.uid"
      :item="messageDoc"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ComponentMessageList",
  data() {
    return {
      messages: [] as Array<any>,
    };
  },
  methods: {
    listenForNewMessages() {
      this.$fire.firestore
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (querySnapshot) => {
            this.messages = [];

            querySnapshot.forEach((message) => {
              this.messages.push({
                uid: message.id,
                ...message.data(),
              });
            });
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  mounted() {
    this.listenForNewMessages();
  },
  updated() {
    this.$nextTick(() => {
      this.$vuetify.goTo(9999999, { easing: "easeInOutCubic", duration: 300 });
    });
  },
});
</script>

<style lang="scss" scoped>
.components__messageList {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
  padding: 15px;

  .components__messageListItem {
    &:not(:first-child) {
      margin-bottom: 15px;
    }
  }
}
</style>