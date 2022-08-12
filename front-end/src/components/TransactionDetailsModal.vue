<template>
  <teleport to="body">
    <div
      v-if="transaction"
      class="fixed top-0 w-screen h-screen bg-neutral-900/75 flex justify-center items-center p-8"
      @click.self="closeModal"
    >
      <article class="bg-white p-8 pt-12 rounded-lg relative">
        <button class="absolute top-0 right-1 text-2xl" @click="closeModal">
          &#128473;
        </button>

        <div class="flex">
          <h1 class="text-3xl">{{ transaction.reference ?? "Transaction" }}</h1>
          <category-badge class="ml-20" :category="transaction.category" />
        </div>

        <p class="mt-10 text-3xl text-center">
          {{ formatNumber(transaction.money.amount) }}
          <span class="text-gray-400">{{ transaction.money.currency }}</span>
        </p>

        <p class="text-right text-xl italic mt-6">
          {{ formatDate(transaction.date) }}
        </p>
      </article>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Transaction } from "../interfaces/transaction";
import { formatDate, formatNumber } from "../services/formatters";
import CategoryBadge from "./CategoryBadge.vue";

defineProps({
  transaction: {
    type: Object as PropType<Transaction | null>,
    default: null
  }
});
const emit = defineEmits<{
  (event: "close"): void;
}>();

function closeModal() {
  emit("close");
}
</script>
