<template>
  <teleport to="body">
    <div
      v-if="errorMessage"
      class="fixed top-0 left-0 text-center w-full py-3 bg-red-500 font-bold"
    >
      {{ errorMessage }}
    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps({
  errorMessage: {
    type: String,
    required: true
  }
});
</script>
