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

      <div class="mt-5 flex gap-5">
        <account-select
          :account-options="accountOptions"
          :disabled="isFetchingAccounts || isFetchingTransactions"
          @select="
            transactionsFilters.accountId = $event !== null ? $event : undefined
          "
        />
        <date-input
          title="Starting month"
          :disabled="isFetchingAccounts || isFetchingTransactions"
          @change="
            transactionsFilters.startingMonth =
              $event !== null ? $event : undefined
          "
        />
        <date-input
          title="Ending month"
          :disabled="isFetchingAccounts || isFetchingTransactions"
          @change="
            transactionsFilters.endingMonth =
              $event !== null ? $event : undefined
          "
        />
      </div>

      <div
        class="border-y border-gray-300 mt-5 max-h-[42.1875rem] overflow-auto relative"
        @scroll="handleTransactionsScroll"
      >
        <loading v-if="isFetchingTransactions && !transactions.length" />
        <transactions-table
          v-else
          :transactions="transactions"
          @sort-change="handleSortChange"
        />

        <loading
          v-show="isFetchingTransactions && transactions.length"
          class="sticky bottom-0"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { Transaction, TransactionFilters } from "./interfaces/transaction";
import { fetchAccounts, fetchTransactions } from "./services/api";
import TransactionsTable from "./components/TransactionsTable.vue";
import Loading from "./components/Loading.vue";
import AccountSelect from "./components/AccountSelect.vue";
import { Account } from "./interfaces/account";
import DateInput from "./components/DateInput.vue";
import { TableSort } from "./interfaces/sort";

const transactions = ref<Transaction[]>([]);
const isFetchingTransactions = ref(false);
const errorMessage = ref("");
const idScrollDebounce = ref<number | undefined>(undefined);
const hasMoreTransactionsToFetch = ref(true);
const currentTransactionsPage = ref(1);
const accountOptions = ref<Account[]>([]);
const isFetchingAccounts = ref(false);
const transactionsFilters = ref<TransactionFilters>({
  accountId: undefined,
  startingMonth: undefined,
  endingMonth: undefined
});
const currentSortType = ref<TableSort>("DESC");

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
        hasMoreTransactionsToFetch.value &&
        !isFetchingTransactions.value
      ) {
        getTransactionsData();
      }
    }
  }, 250);
}

function handleSortChange(sortType: TableSort) {
  currentSortType.value = sortType;
  transactions.value = [];
  currentTransactionsPage.value = 1;

  getTransactionsData();
}

async function getTransactionsData() {
  isFetchingTransactions.value = true;

  try {
    const response = await fetchTransactions({
      input: {
        first: TRANSACTIONS_PER_PAGE,
        offset: currentTransactionsPage.value,
        sortOrder: currentSortType.value,
        filters: transactionsFilters.value
      }
    });

    transactions.value = [...transactions.value, ...response];
    hasMoreTransactionsToFetch.value =
      response.length === TRANSACTIONS_PER_PAGE;

    if (hasMoreTransactionsToFetch.value) {
      currentTransactionsPage.value++;
    }
  } catch {
    errorMessage.value = "Something went wrong. Reload the page!";
  } finally {
    isFetchingTransactions.value = false;
  }
}

async function getAccountsData() {
  isFetchingAccounts.value = true;

  try {
    accountOptions.value = await fetchAccounts();
  } catch {
    errorMessage.value = "Something went wrong. Reload the page!";
  } finally {
    isFetchingAccounts.value = false;
  }
}

watch(
  transactionsFilters,
  () => {
    transactions.value = [];
    currentTransactionsPage.value = 1;
    console.log(transactionsFilters.value);
    getTransactionsData();
  },
  { deep: true }
);

onBeforeMount(() => {
  getTransactionsData();
  getAccountsData();
});
</script>
