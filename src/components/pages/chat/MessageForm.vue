<template>
  <div class="components__messageForm">
    <v-divider />
    <v-text-field
      v-model="formData.message"
      placeholder="Enter your message"
      hide-details="auto"
      append-icon="mdi-send"
      :disabled="loading"
      :loading="loading"
      flat
      solo
      @keyup.enter="send"
      @click:append="send"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import { isEmpty } from "lodash";

interface FormData {
  message: string;
}

export default Vue.extend({
  name: "ComponentMessageForm",
  data() {
    return {
      loading: false as boolean,
      formData: {
        message: "",
      } as FormData,
    };
  },
  methods: {
    clearForm() {
      this.formData.message = "";
    },
    async send() {
      if (isEmpty(this.formData.message)) {
        return;
      }

      try {
        const authUser = this.$store.state.authUser;
        const messagesRef = this.$fire.firestore.collection("messages").doc();

        await messagesRef.set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          sender: {
            uid: authUser.uid,
            email: authUser.email,
          },
          ...this.formData,
        });

        this.clearForm();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.components__messageForm {
  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>