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
import { mapState } from "vuex";

export default Vue.extend({
  name: "ComponentMessageList",
  computed: {
    ...mapState("chat", ["messages"]),
  },
  mounted() {
    this.$store.dispatch("chat/listenForNewMessages");
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
  position: relative;
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