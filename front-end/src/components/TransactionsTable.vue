<template>
  <table class="w-full">
    <thead class="text-left text-gray-400">
      <tr>
        <th class="font-normal w-6/12 px-2 py-4">Reference</th>
        <th class="font-normal w-3/12 px-2 py-4">Category</th>
        <th
          class="font-normal w-1/12 px-2 py-4 cursor-pointer"
          @click="toggleSortType"
        >
          Date {{ currentSortType === "desc" ? "&#9660;" : "&#9650;" }}
        </th>
        <th class="font-normal text-right px-2 py-4">Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="transaction in sortedTransactions"
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
          <span
            v-if="transaction.category"
            class="text-gray-900 rounded-md py-2 px-4"
            :style="{
              'background-color': getCategoryColor(transaction.category.color)
            }"
          >
            {{ transaction.category.name }}
          </span>
          <span>-</span>
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
import { compareAsc, compareDesc, format } from "date-fns";
import { onBeforeMount, PropType, ref, watch } from "vue";
import { TableSort } from "../interfaces/sort";
import { Transaction } from "../interfaces/transaction";

const props = defineProps({
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true
  }
});

const currentSortType = ref<TableSort>("desc");
const sortedTransactions = ref<Transaction[]>([]);

function toggleSortType() {
  currentSortType.value = currentSortType.value === "desc" ? "asc" : "desc";

  sortTransactions();
}

function getCategoryColor(color: string | null): string {
  return color ? `#${color}` : "#f2f2f2";
}

function formatDate(date: Date): string {
  return format(new Date(date), "dd/MM/yy");
}

function formatNumber(number: number): string {
  const fixedDecimal = number.toFixed(2);

  return parseFloat(fixedDecimal).toLocaleString();
}

function sortTransactions() {
  sortedTransactions.value = [...props.transactions].sort((a, b) => {
    if (currentSortType.value === "desc") {
      return compareDesc(new Date(a.date), new Date(b.date));
    } else {
      return compareAsc(new Date(a.date), new Date(b.date));
    }
  });
}

watch(
  () => props.transactions,
  () => {
    sortTransactions();
  }
);

onBeforeMount(() => {
  sortTransactions();
});
</script>
