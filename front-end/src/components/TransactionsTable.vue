<template>
  <table class="w-full">
    <thead class="text-left text-gray-400">
      <tr>
        <th class="font-normal w-5/12 px-2 py-4">Reference</th>
        <th class="font-normal w-4/12 px-2 py-4">Category</th>
        <th
          class="font-normal w-1/12 px-2 py-4 cursor-pointer"
          @click="toggleSortType"
        >
          Date {{ currentSortType === "DESC" ? "&#9660;" : "&#9650;" }}
        </th>
        <th class="font-normal text-right px-2 py-4">Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="transaction in transactions"
        :key="transaction.id"
        class="border-t border-gray-200"
      >
        <td class="px-2 py-4">
          <template v-if="transaction.reference">{{
            transaction.reference
          }}</template>
          <span v-else class="text-gray-400">No reference provided</span>
        </td>
        <td class="px-2 py-4">
          <category-badge :category="transaction.category" />
        </td>
        <td class="px-2 py-4">{{ formatDate(transaction.date) }}</td>
        <td class="text-right px-2 py-4">
          {{ formatNumber(transaction.money.amount) }}
          <span class="text-gray-400">{{ transaction.money.currency }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { PropType, ref } from "vue";
import { TableSort } from "../interfaces/sort";
import { Transaction } from "../interfaces/transaction";
import CategoryBadge from "./CategoryBadge.vue";

defineProps({
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true
  }
});
const emit = defineEmits<{
  (event: "sort-change", sortType: TableSort): void;
}>();

const currentSortType = ref<TableSort>("DESC");

function toggleSortType() {
  currentSortType.value = currentSortType.value === "DESC" ? "ASC" : "DESC";

  emit("sort-change", currentSortType.value);
}

function formatDate(date: Date): string {
  return format(new Date(date), "dd/MM/yy");
}

function formatNumber(number: number): string {
  const fixedDecimal = number.toFixed(2);

  return parseFloat(fixedDecimal).toLocaleString();
}
</script>
