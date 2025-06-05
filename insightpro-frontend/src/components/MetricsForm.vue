<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold">
      {{ isEdit ? "Edit Metric" : "Add New Metric" }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="Metric title"
        class="w-full border rounded-xl px-4 py-2"
      />

      <input
        v-model.number="form.value"
        type="number"
        required
        placeholder="Value"
        class="w-full border rounded-xl px-4 py-2"
      />

      <input
        v-model="form.category"
        type="text"
        required
        placeholder="Category"
        class="w-full border rounded-xl px-4 py-2"
      />

      <input
        v-model="form.date"
        type="date"
        required
        class="w-full border rounded-xl px-4 py-2"
      />

      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border rounded-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          {{ isEdit ? "Update" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps<{
  metric?: any;
}>();

const emit = defineEmits(["submit", "cancel"]);

const isEdit = ref(!!props.metric);

const form = ref({
  title: "",
  value: 0,
  category: "",
  date: new Date().toISOString().slice(0, 10),
});

watch(
  () => props.metric,
  () => {
    if (props.metric) {
      form.value = {
        title: props.metric.title,
        value: props.metric.value,
        category: props.metric.category,
        date: props.metric.date.slice(0, 10),
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("submit", { ...form.value });
};
</script>
