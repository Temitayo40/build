<template>
  <BaseLayout>
    <div class="p-4 space-y-6">
      <h1 class="text-2xl font-bold">📄 Reports</h1>

      <div class="bg-white p-6 rounded-2xl shadow space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <label class="flex-1">
            <span class="block font-medium text-gray-600 mb-1">Start Date</span>
            <input
              type="date"
              v-model="startDate"
              class="w-full border px-3 py-2 rounded-xl"
            />
          </label>
          <label class="flex-1">
            <span class="block font-medium text-gray-600 mb-1">End Date</span>
            <input
              type="date"
              v-model="endDate"
              class="w-full border px-3 py-2 rounded-xl"
            />
          </label>
          <label class="flex-1">
            <span class="block font-medium text-gray-600 mb-1">Format</span>
            <select v-model="format" class="w-full border px-3 py-2 rounded-xl">
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </label>
        </div>

        <button
          @click="downloadReport"
          class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
          :disabled="loading"
        >
          {{ loading ? "Generating..." : "Download Report" }}
        </button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import { generateReport } from "../services/reportService";

const startDate = ref("");
const endDate = ref("");
const format = ref<"pdf" | "csv">("pdf");
const loading = ref(false);

const downloadReport = async () => {
  loading.value = true;
  try {
    const blob = await generateReport({
      startDate: startDate.value,
      endDate: endDate.value,
      format: format.value,
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metrics-report.${format.value}`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error downloading report");
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
