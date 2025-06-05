<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Create an Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="w-full input"
          required
        />
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full input"
          required
        />

        <button
          :disabled="loading"
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 inline-flex items-center justify-center disabled:cursor-not-allowed"
        >
          {{ loading ? "Registering" : "Register" }}
          <span v-if="loading" class="loader ml-2"></span>
        </button>
      </form>

      <div class="my-4 text-center text-gray-400">or</div>

      <button
        @click="registerWithGoogle"
        class="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="h-5 w-5"
        />
        Continue with Google
      </button>

      <p class="text-sm text-center mt-4">
        Already have an account?
        <RouterLink to="/login" class="text-blue-600 hover:underline"
          >Login</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { toast } from "vue3-toastify";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  loading.value = true;
  if (password.value !== confirmPassword.value) {
    toast.warning("Passwords don't match.");
    loading.value = false;
    return;
  }

  const success = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  loading.value = false;
  if (success) {
    router.push("/");
  }
};

const registerWithGoogle = () => {
  window.location.href =
    import.meta.env.VITE_API_URL + "/auth/google/callback  ";
};
</script>

<style scoped>
.input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
}

.input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
}

.loader {
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
