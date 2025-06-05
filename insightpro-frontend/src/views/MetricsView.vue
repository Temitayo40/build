<template>
  <BaseLayout>
    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">📈 Metrics</h1>
        <input
          v-model="search"
          type="text"
          placeholder="Search metrics..."
          class="px-4 py-2 border rounded-xl w-64"
        />
      </div>

      <!-- Chart -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">Metrics Trend</h2>
        <LineChart :data="filteredChartData" />
      </div>

      <!-- Table -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">All Metrics</h2>
        <table class="w-full text-left">
          <thead>
            <tr class="border-b text-sm text-gray-500">
              <th class="py-2">Date</th>
              <th class="py-2">Name</th>
              <th class="py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="m in filteredMetrics"
              :key="m._id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2">{{ formatDate(m.date) }}</td>
              <td class="py-2">{{ m.name }}</td>
              <td class="py-2 font-semibold">{{ m.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import LineChart from "../components/LineChart.vue";
import { fetchMetrics } from "../services/metricsService";
import BaseLayout from "../layouts/BaseLayout.vue";
const metrics = ref<any[]>([]);
const search = ref("");

onMounted(async () => {
  metrics.value = await fetchMetrics();
});

const filteredMetrics = computed(() =>
  metrics.value.filter((m) =>
    m.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const filteredChartData = computed(() => {
  return filteredMetrics.value.map((m) => ({
    date: m.date,
    value: m.value,
  }));
});

const formatDate = (date: string) => new Date(date).toLocaleDateString();
</script>
