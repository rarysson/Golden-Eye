<template>
  <div
    v-if="errorMessage"
    class="fixed top-0 left-0 text-center w-full py-3 bg-red-500 font-bold"
  >
    {{ errorMessage }}
  </div>

  <div class="flex flex-col h-full">
    <h1 class="text-center font-bold text-3xl">Golden Eye</h1>

    <main
      class="flex-auto w-full max-w-6xl mx-auto bg-white mt-7 p-4 rounded-lg"
    >
      <h2 class="font-bold text-lg">Transactions</h2>

      <div
        class="border-y border-gray-300 mt-5 max-h-[42.1875rem] overflow-auto"
      >
        <loading v-if="isFetchingData" />
        <transactions-table v-else :transactions="transactions" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Transaction } from "./interfaces/transaction";
import { fetchTransactions } from "./services/api";
import TransactionsTable from "./components/TransactionsTable.vue";
import Loading from "./components/Loading.vue";

const transactions = ref<Transaction[]>([]);
const isFetchingData = ref(false);
const errorMessage = ref("");

onBeforeMount(async () => {
  isFetchingData.value = true;

  try {
    transactions.value = await fetchTransactions();
  } catch {
    errorMessage.value = "Something went wrong. Reload the page!";
  } finally {
    isFetchingData.value = false;
  }
});
</script>
