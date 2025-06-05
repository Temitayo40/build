<template>
  <BaseLayout>
    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">🧠 Insights</h1>
        <button
          @click="generateInsight"
          :disabled="loading"
          class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Generating..." : "🔁 Refresh Insight" }}
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow p-6 min-h-[180px] text-gray-800">
        <h2 class="text-lg font-semibold mb-2">AI-Generated Summary</h2>
        <p v-if="insight" class="whitespace-pre-line">{{ insight }}</p>
        <p v-else class="text-gray-400 italic">No insight available yet.</p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getInsightSummary } from "../services/insightService";
import BaseLayout from "../layouts/BaseLayout.vue";
const insight = ref("");
const loading = ref(false);

const generateInsight = async () => {
  loading.value = true;
  try {
    const result = await getInsightSummary();
    insight.value = result.summary;
  } catch (err) {
    console.error(err);
    insight.value = "Failed to fetch insight. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  generateInsight();
});
</script>
