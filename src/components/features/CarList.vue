<script lang="ts" setup>
import type { TCarEntry } from "@/types/TCar";

defineProps<{ cars: TCarEntry[] }>();
</script>

<template>
  <ul class="brand-list">
    <li
      v-for="({ brand, cars: models }, index) in cars"
      :key="`${index}-${brand}`"
      class="brand-item"
    >
      <span class="brand-name">{{ index + 1 }}. {{ brand }}:</span>
      <ul class="model-list">
        <li
          v-for="({ model, year, performance_class }, id) in models"
          :key="model"
        >
          {{ id + 1 }}. {{ model }} {{ year }}, class: {{ performance_class }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.brand-list {
  text-align: left;
}
</style>
