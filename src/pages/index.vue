<template>
  <div id="pages__index" class="text-center pa-4">
    <h1 class="mb-6">Welcome</h1>

    <pages-index-auth-form />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "landing",
  name: "PageIndex",
  middleware: ["guest"],
});
</script>