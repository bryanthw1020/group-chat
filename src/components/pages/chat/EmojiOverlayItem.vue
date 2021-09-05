<template>
  <div :id="`emoji-${index}`" class="components__emojiOverlayItem">
    <span
      class="emoji__body"
      :style="{
        fontSize: `${item.size}px`,
        right: `${item.xPosition}%`,
      }"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// @ts-ignore
import anime from "animejs/lib/anime.es";

export default Vue.extend({
  name: "ComponentEmojiOverlayItem",
  props: {
    index: {
      type: Number,
      required: true,
    },
    item: {
      required: true,
    },
  },
  data() {
    return {
      completed: false,
    };
  },
  mounted() {
    const item: any = this.item;

    anime({
      targets: `#emoji-${this.index}`,
      translateY: -400,
      opacity: 0,
      duration: item.duration,
      delay: () => {
        return this.index * 100;
      },
      autoplay: true,
      easing: "easeInOutSine",
    });
  },
});
</script>

<style lang="scss" scoped>
.components__emojiOverlayItem {
  position: relative;

  .emoji__body {
    position: absolute;
    z-index: -1;
    bottom: -20;
  }
}
</style>