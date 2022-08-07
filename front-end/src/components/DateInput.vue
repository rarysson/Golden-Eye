<template>
  <div class="flex flex-col">
    <label class="text-gray-500" :for="title">{{ title }}</label>
    <input
      :id="title"
      class="border-2 border-gray-300 rounded-md p-1.5 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100"
      type="date"
      :disabled="disabled"
      v-model="date"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["change"]);

const date = ref<string | null>(null);

watch(date, () => {
  emit("change", date.value ? date.value : null);
});
</script>
