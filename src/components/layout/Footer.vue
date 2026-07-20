<script lang="ts" setup>
import { useDateFormat, useNow } from "@vueuse/core";

const formatted = useDateFormat(useNow(), "YYYY"); // 2026
// const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <footer class="footer">
    <span>{{ formatted }} Car Roulette</span>
    <nav class="footer-nav">
      <a href="#">О проекте</a>
      <a href="#">Контакты</a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
}

.footer-nav {
  display: flex;
  gap: 0.625rem;
}
</style>
