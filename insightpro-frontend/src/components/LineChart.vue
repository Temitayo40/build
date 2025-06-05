<template>
  <div class="w-full h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title
);

const props = defineProps<{
  data: { date: string; value: number }[];
}>();

const chartData = {
  labels: props.data.map((d) => new Date(d.date).toLocaleDateString()),
  datasets: [
    {
      label: "Metric Value",
      data: props.data.map((d) => d.value),
      borderColor: "#3B82F6",
      tension: 0.3,
      fill: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
</script>
