<template>
  <div class="flex flex-col">
    <label class="text-gray-500" for="account-select">Account</label>
    <select
      id="account-select"
      class="w-52 border-2 border-gray-300 bg-white py-2 pl-1 pr-4 rounded-md disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100"
      :disabled="disabled"
      v-model="currentAccountOption"
    >
      <option :value="null" selected>No filter</option>
      <option
        v-for="option in accountOptions"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Account } from "../interfaces/account";

defineProps({
  accountOptions: {
    type: Array as PropType<Account[]>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{
  (event: "select", accountId: string | null): void;
}>();

const currentAccountOption = ref<string | null>(null);

watch(currentAccountOption, () => {
  emit("select", currentAccountOption.value);
});
</script>
