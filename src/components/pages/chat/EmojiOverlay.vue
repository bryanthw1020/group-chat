<template>
  <div class="components__emojiOverlay">
    <template v-if="emojis && emojis.length">
      <pages-chat-emoji-overlay-item
        v-for="(emoji, index) in emojis"
        :key="index"
        :index="index"
        :item="emoji"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ComponentEmojiOverlay",
  computed: mapState("chat", ["emojis"]),
});
</script>

<style lang="scss" scoped>
.components__emojiOverlay {
  position: sticky;
  bottom: 50px;
  left: 0;
  width: 100%;
}
</style>