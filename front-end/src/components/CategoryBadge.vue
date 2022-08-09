<template>
  <span
    class="text-gray-900 rounded-md py-2 px-4"
    :style="{
      'background-color': getCategoryColor(category?.color)
    }"
  >
    {{ category?.name ?? "No category" }}
  </span>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Category } from "../interfaces/transaction";

defineProps({
  category: {
    type: Object as PropType<Category | null>,
    default: null
  }
});

function getCategoryColor(color: string | null | undefined): string {
  return color ? `#${color}` : "#f2f2f2";
}
</script>
