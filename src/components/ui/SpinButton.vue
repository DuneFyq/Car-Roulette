<script lang="ts" setup>
defineProps<{
  isSpinning: boolean;
  spin: () => void;
}>();
</script>

<template>
  <button @click="spin" class="spin-button" :disabled="isSpinning">
    {{ isSpinning ? "Крутится..." : "Крутить" }}
  </button>
</template>

<style scoped>
.spin-button {
  font-size: clamp(0.875rem, 0.7386rem + 0.6818vw, 1.25rem);
  font-weight: 700;
  padding: 0.625rem 1.25rem;
  background: var(--accent-neon);
}

.spin-button:hover:not(:disabled) {
  background: var(--accent-signal);
}

.spin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
