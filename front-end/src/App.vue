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
        class="border-y border-gray-300 mt-5 max-h-[42.1875rem] overflow-auto relative"
        @scroll="handleTransactionsScroll"
      >
        <loading v-if="isFetchingData && !transactions.length" />
        <transactions-table v-else :transactions="transactions" />

        <loading
          v-show="isFetchingData && transactions.length"
          class="sticky bottom-0"
        />
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
const idScrollDebounce = ref<number | undefined>(undefined);
const hasMoreTransactionsToFetch = ref(true);
const currentTransactionsPage = ref(1);

const TRANSACTIONS_PER_PAGE = 50;

function handleTransactionsScroll({ target }: Event) {
  clearTimeout(idScrollDebounce.value);

  idScrollDebounce.value = setTimeout(() => {
    if (target) {
      const { offsetHeight, scrollTop, scrollHeight } =
        target as HTMLDivElement;

      // Reached the end of the TransactionsTable container
      if (
        offsetHeight + scrollTop >= scrollHeight &&
        hasMoreTransactionsToFetch
      ) {
        getTransactionsData();
      }
    }
  }, 250);
}

async function getTransactionsData() {
  isFetchingData.value = true;

  try {
    const response = await fetchTransactions();

    transactions.value = [...transactions.value, ...response];
    hasMoreTransactionsToFetch.value =
      response.length === TRANSACTIONS_PER_PAGE;

    if (hasMoreTransactionsToFetch.value) {
      currentTransactionsPage.value++;
    }
  } catch {
    errorMessage.value = "Something went wrong. Reload the page!";
  } finally {
    isFetchingData.value = false;
  }
}

onBeforeMount(() => {
  getTransactionsData();
});
</script>
