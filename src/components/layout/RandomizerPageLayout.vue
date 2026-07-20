<script lang="ts" setup>
import History from "@/components/features/History.vue";

interface Props {
  title: string;
  isLoading?: boolean;
  listTitle?: string;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  listTitle: "",
});
</script>

<template>
  <section class="randomizer-page page">
    <h2 class="title">{{ title }}</h2>

    <div class="spin">
      <slot name="roulette" />

      <div v-if="isLoading" class="loading-state">Загрузка данных...</div>
    </div>

    <slot name="extra"></slot>

    <template v-if="listTitle">
      <h3 class="list-title">{{ listTitle }}</h3>
      <div class="list">
        <slot name="list" />
      </div>
    </template>

    <History />
  </section>
</template>

<style scoped>
.randomizer-page {
  --font-size-title: clamp(1.25rem, 0.8864rem + 1.8182vw, 2.25rem);
  --font-size-section-title: clamp(1.125rem, 0.8977rem + 1.1364vw, 1.75rem);
  --font-size-text: clamp(0.625rem, 0.4886rem + 0.6818vw, 1rem);
}

.randomizer-page {
  text-align: center;
}

.title {
  font-size: var(--font-size-title);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

.list-title {
  font-size: var(--font-size-section-title);
  font-weight: 600;
  line-height: 1.3;
  margin: 0.5em;
}

.list {
  text-align: left;

  font-size: var(--font-size-text);
  line-height: 1.4;
  margin-top: 0.625em;
  padding: 1em;

  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}

.spin {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
