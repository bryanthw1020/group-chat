<template>
  <div class="components__authForm">
    <v-alert type="error" v-if="errorMessage">
      {{ errorMessage }}
    </v-alert>

    <v-form :disabled="loading" @submit.prevent="submit">
      <v-text-field v-model="formData.email" label="Email" />
      <v-text-field
        v-model="formData.password"
        label="Password"
        type="password"
      />

      <div class="my-2">
        <v-btn color="primary" type="submit" :loading="loading">
          <template v-if="currentAction === 'register'"> Register </template>
          <template v-else> Join Chat </template>
        </v-btn>
      </div>
    </v-form>

    <v-divider class="my-4" />

    <p v-if="currentAction === 'register'">
      Already have an account? <a @click="switchAction('login')">Login</a>
    </p>
    <p v-else-if="currentAction === 'login'">
      Do not have an account?
      <a @click="switchAction('register')">Register an account</a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { debounce } from "lodash";

interface FormData {
  email: string;
  password: string;
}

export default Vue.extend({
  name: "ComponentAuthForm",
  data() {
    return {
      loading: false as boolean,
      currentAction: "login" as string,
      errorMessage: "" as string | null,
      formData: {
        email: "",
        password: "",
      } as FormData,
    };
  },
  methods: {
    switchAction(action: string): void {
      this.currentAction = action;
    },
    clearErrorMessage(): void {
      this.errorMessage = null;
    },
    handleError(error: any): void {
      if (typeof error.message !== "undefined") {
        this.errorMessage = error.message;

        return;
      }

      this.errorMessage = "Unexpected error occurred. Please try again.";
    },
    async submit() {
      this.clearErrorMessage();

      if (this.currentAction === "register") {
        await this.register();

        return;
      }

      await this.login();
    },
    async login(): Promise<void> {
      try {
        this.loading = true;

        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    async register(): Promise<void> {
      try {
        this.loading = true;

        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
  },
});
</script>