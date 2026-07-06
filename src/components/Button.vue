<template>
  <button class="button">
    <slot>Нажми</slot>
  </button>
</template>

<style scoped>
button {
  font-size: 50px;
  background: var(--color-gray-300);
  border: var(--border);
  border-radius: var(--border-radius);
}
</style>
