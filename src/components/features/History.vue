<script lang="ts" setup>
import { ref, onMounted } from "vue";

const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  currentTime.value = `${hours}:${minutes}`;
};

onMounted(() => {
  updateTime();
});
</script>

<template>
  <h1 class="title">История</h1>

  <ul class="history-list">
    <li>
      Машина - <time>{{ currentTime }}</time>
    </li>
    <li>
      Машина - <time>{{ currentTime }}</time>
    </li>
    <li>
      Машина - <time>{{ currentTime }}</time>
    </li>
    <li>
      Машина - <time>{{ currentTime }}</time>
    </li>
    <li>
      Машина - <time>{{ currentTime }}</time>
    </li>
  </ul>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 700;
}

.history-list {
  text-align: left;
  margin-top: 0.625rem;
  padding: 1rem;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}
</style>
