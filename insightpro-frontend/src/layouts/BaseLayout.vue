<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Mobile Sidebar (overlay) -->
    <transition name="fade">
      <div
        v-if="showSidebar"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="showSidebar = false"
      ></div>
    </transition>

    <transition name="slide">
      <aside
        v-if="showSidebar"
        class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md p-4 md:hidden"
      >
        <div class="font-bold text-blue-600 text-lg mb-6">InsightPro</div>
        <nav>
          <RouterLink
            @click="closeSidebar"
            to="/"
            class="block py-2 px-3 rounded hover:bg-blue-100"
            >Dashboard</RouterLink
          >
          <RouterLink
            @click="closeSidebar"
            to="/metrics"
            class="block py-2 px-3 rounded hover:bg-blue-100"
            >Metrics</RouterLink
          >
          <RouterLink
            @click="closeSidebar"
            to="/reports"
            class="block py-2 px-3 rounded hover:bg-blue-100"
            >Reports</RouterLink
          >
          <RouterLink
            @click="closeSidebar"
            to="/ai"
            class="block py-2 px-3 rounded hover:bg-blue-100"
            >AI Insights</RouterLink
          >
        </nav>
      </aside>
    </transition>

    <!-- Desktop Sidebar -->
    <aside class="w-64 bg-white shadow-lg hidden md:block">
      <div class="p-4 font-bold text-lg text-blue-600">InsightPro</div>
      <nav class="mt-6 px-4 space-y-2">
        <RouterLink to="/" class="block py-2 px-3 rounded hover:bg-blue-100"
          >Dashboard</RouterLink
        >
        <RouterLink
          to="/metrics"
          class="block py-2 px-3 rounded hover:bg-blue-100"
          >Metrics</RouterLink
        >
        <RouterLink
          to="/reports"
          class="block py-2 px-3 rounded hover:bg-blue-100"
          >Reports</RouterLink
        >
        <RouterLink to="/ai" class="block py-2 px-3 rounded hover:bg-blue-100"
          >AI Insights</RouterLink
        >
      </nav>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar -->
      <header
        class="bg-white shadow px-4 py-3 flex justify-between items-center md:pl-6"
      >
        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-gray-700"
          @click="showSidebar = !showSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 class="text-xl font-semibold text-gray-700">Dashboard</h1>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">Hello, User</span>
          <button class="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6 overflow-y-auto flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showSidebar = ref(false);

const closeSidebar = () => {
  showSidebar.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
