<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login to InsightPro</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full input"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full input"
          required
        />

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div class="my-4 text-center text-gray-400">or</div>

      <button
        @click="loginWithGoogle"
        class="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="h-5 w-5"
        />
        Continue with Google
      </button>

      <p class="text-sm text-center mt-4">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-600 hover:underline"
          >Register</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  const success = await authStore.login(credentials);
  if (success) {
    router.push("/");
  }
};

const loginWithGoogle = () => {
  window.location.href = import.meta.env.VITE_API_URL + "/auth/google";
};
</script>

<style scoped>
.input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
}
</style>
