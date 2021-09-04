<template>
  <v-app>
    <v-main class="primary">
      <v-container class="white elevation-2">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LayoutLanding",
});
</script>

<style lang="scss" scoped>
.v-main {
  ::v-deep.v-main__wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    > .container {
      max-width: 500px;
      border-radius: 10px;
    }
  }
}
</style>