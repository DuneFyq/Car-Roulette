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
  font-size: clamp(1.125rem, 0.8977rem + 1.1364vw, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
  margin: 0.5em;
}

.history-list {
  font-size: clamp(0.625rem, 0.4886rem + 0.6818vw, 1rem);
  text-align: left;
  line-height: 1.6;
  margin-top: 0.625em;
  padding: 1em;

  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}
</style>
