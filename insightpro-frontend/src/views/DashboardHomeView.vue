<template>
  <BaseLayout>
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-bold">Welcome back, {{ user?.name }} 👋</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl shadow p-4">
          <h2 class="text-lg font-semibold">Total Metrics</h2>
          <p class="text-3xl font-bold text-blue-600">{{ metricsCount }}</p>
        </div>

        <div class="bg-white rounded-2xl shadow p-4">
          <h2 class="text-lg font-semibold">Reports Generated</h2>
          <p class="text-3xl font-bold text-green-600">{{ reportsCount }}</p>
        </div>

        <div class="bg-white rounded-2xl shadow p-4">
          <h2 class="text-lg font-semibold">Latest Insight</h2>
          <p class="text-sm text-gray-600 mt-2 truncate">{{ latestInsight }}</p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/auth";
import BaseLayout from "../layouts/BaseLayout.vue";

const auth = useAuthStore();
const user = auth.user;

const metricsCount = ref(0);
const reportsCount = ref(0);
const latestInsight = ref("");

onMounted(async () => {
  // 🚀 Call backend APIs to populate this (dummy for now)
  metricsCount.value = 24;
  reportsCount.value = 7;
  latestInsight.value = "Sales increased by 18% compared to last month.";
});
</script>
