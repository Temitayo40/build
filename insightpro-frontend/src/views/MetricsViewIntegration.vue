<script setup lang="ts">
import { ref, onMounted } from "vue";
import MetricsForm from "../components/MetricsForm.vue";
import {
  getMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
} from "../services/metricsServiceIntegration";

const metrics = ref<any[]>([]);
const selectedMetric = ref<any | null>(null);
const showForm = ref(false);
const isEdit = ref(false);

const loadMetrics = async () => {
  metrics.value = await getMetrics();
};

const openForm = (metric = null) => {
  selectedMetric.value = metric;
  isEdit.value = !!metric;
  showForm.value = true;
};

const handleFormSubmit = async (data: any) => {
  if (isEdit.value && selectedMetric.value) {
    await updateMetric(selectedMetric.value._id, data);
  } else {
    await createMetric(data);
  }
  showForm.value = false;
  selectedMetric.value = null;
  loadMetrics();
};

onMounted(loadMetrics);
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">📊 Metrics</h1>
      <button
        @click="openForm()"
        class="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        + Add Metric
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="metric in metrics"
        :key="metric._id"
        class="bg-white p-4 rounded-2xl shadow space-y-2"
      >
        <h2 class="text-lg font-semibold">{{ metric.title }}</h2>
        <p><strong>Value:</strong> {{ metric.value }}</p>
        <p><strong>Category:</strong> {{ metric.category }}</p>
        <p><strong>Date:</strong> {{ metric.date.slice(0, 10) }}</p>
        <div class="flex gap-2 mt-2">
          <button
            @click="openForm(metric)"
            class="text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        <MetricsForm
          :metric="selectedMetric"
          @submit="handleFormSubmit"
          @cancel="showForm = false"
        />
      </div>
    </div>
  </div>
</template>
