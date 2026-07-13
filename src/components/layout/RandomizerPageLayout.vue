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
  <section class="randomizer-page">
    <h2 class="title">{{ title }}</h2>

    <div class="spin">
      <slot name="roulette" />

      <div v-if="isLoading" class="loading-state">Загрузка данных...</div>
    </div>

    <slot name="extra"></slot>

    <template v-if="listTitle">
      <h3 class="list-title">{{ listTitle }}</h3>
      <slot name="list" />
    </template>

    <History />
  </section>
</template>

<style scoped>
.randomizer-page {
  text-align: center;

  width: 100%;
  height: 100%;
}

.title {
  font-size: 2.6rem;
  font-weight: 700;
}

.spin {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
