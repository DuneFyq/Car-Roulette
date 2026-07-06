<script lang="ts" setup>
import SlotItem from "./SlotItem.vue";
</script>

<template>
  <div class="pointer">-_-</div>
  <ul class="roulette">
    <SlotItem />
    <SlotItem />
    <SlotItem />
    <SlotItem />
  </ul>
</template>

<style scoped>
.pointer {
  background-color: red;
}

.roulette {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background: var(--color-bg-secondary);
}
</style>
