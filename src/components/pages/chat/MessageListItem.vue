<template>
  <v-card
    class="components__messageListItem"
    :class="{ 'is-self': authUser.uid === item.sender.uid }"
  >
    <p
      v-if="authUser.uid !== item.sender.uid"
      class="sender mb-2 text-truncate"
    >
      {{ item.sender.email }}
    </p>
    <p class="body mb-2">
      {{ item.message }}
    </p>
    <p class="time mb-0">
      {{ humanReadableDate }}
    </p>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ComponentMessageListItem",
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    ...mapState(["authUser"]),
    humanReadableDate() {
      const item: any = this.item;

      if (item.createdAt) {
        return this.$moment(item.createdAt.toDate()).format(
          "MMM DD, YYYY h:mm A"
        );
      }

      return "-";
    },
  },
});
</script>

<style lang="scss" scoped>
.components__messageListItem {
  max-width: 350px;
  border-radius: 15px;
  border-top-left-radius: 0;
  padding: 10px 12px;

  &.is-self {
    align-self: flex-end;
    border-top-left-radius: 15px;
    border-top-right-radius: 0;
    background-color: #0399fe;
    color: #fff;

    .time {
      color: #efefef;
    }
  }

  .time {
    font-size: 12px;
    text-align: right;
    color: #bdbdbd;
  }
}
</style>