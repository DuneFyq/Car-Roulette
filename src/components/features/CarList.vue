<script lang="ts" setup>
import type { TCarEntry } from "@/types/TCar";

defineProps<{
  cars: TCarEntry[];
}>();
</script>

<template>
  <ul class="car-list">
    <li v-for="{ brand, cars: models } in cars" :key="brand" class="item">
      <h3 class="brand">
        {{ brand }}
      </h3>

      <ul class="models">
        <li
          v-for="({ model, year, performance_class }, index) in models"
          :key="`${model}-${year}`"
          class="model"
        >
          <span class="model-name">{{ index + 1 }}. {{ model }}</span>
          <div class="model-meta">
            <span class="year">{{ year }}</span>
            <span class="class">{{ performance_class }}</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.car-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  background: var(--color-bg-panel);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 1.25rem;
  transition:
    transform var(--transition-duration) var(--transition-timing),
    box-shadow var(--transition-duration) var(--transition-timing);
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow-base);
}

.brand {
  font-size: clamp(1.0625rem, 0.9943rem + 0.3409vw, 1.25rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--accent-neon);
  padding-bottom: 0.4rem;
  display: inline-block;
}

.models {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.model {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: background var(--transition-duration) var(--transition-timing);
}
.model:hover {
  background: var(--color-bg-main);
}

.model-name {
  font-size: clamp(0.75rem, 0.7045rem + 0.2273vw, 0.875rem);
  font-weight: 600;
  color: var(--text-primary);
}

.model-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: clamp(0.625rem, 0.5341rem + 0.4545vw, 0.875rem);
}

.year {
  color: var(--color-light);
}

.class {
  font-size: clamp(0.625rem, 0.5795rem + 0.2273vw, 0.75rem);
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-dark);
  letter-spacing: 0.03em;
  background: var(--accent-neon);
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
}
</style>
