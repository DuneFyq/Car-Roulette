<script lang="ts" setup>
import RouletteWheel from "@/components/features/RouletteWheel.vue";
import CarList from "@/components/features/CarList.vue";

import SlotRoulette from "@/components/ui/SlotRoulette.vue";
import RandomizerPageLayout from "@/components/layout/RandomizerPageLayout.vue";

import { computed, onMounted } from "vue";
import { useCarStore } from "@/stores/car";
import { randomFromArray } from "@/utils/randomUtils";

import type { TSlot } from "@/types/TSlot";
import type { TCarContent, TCarEntry } from "@/types/TCar";

defineOptions({
  name: "page.car",
});

const getRandomCarItem = (items: TSlot[]): TSlot => {
  if (!items || items.length === 0) {
    return {};
  }

  return randomFromArray(items);
};

const store = useCarStore();

onMounted(() => {
  store.loadCars?.();
});

const formattedCars = computed<TSlot[]>(() => {
  if (!store.cars || !Array.isArray(store.cars)) {
    return [];
  }

  return store.cars.flatMap((item) => {
    if (!item || typeof item !== "object") return [];

    return Object.entries(item).flatMap(([brand, models]) => {
      if (!Array.isArray(models)) return [];

      return models.map((model: TCarContent) => ({
        id: `${brand}-${model.model}-${model.year}`,
        brand,
        model: model.model,
        year: String(model.year),
        performance_class:
          model.performance_class || (model as any).class || "Unknown",
        is_premium: String(model.is_premium ?? false),
        is_exclusive: String(model.is_exclusive ?? false),
      }));
    });
  });
});

const groupedCars = computed<TCarEntry[]>(() => {
  const grouped: Record<string, TCarContent[]> = {};

  formattedCars.value.forEach((car) => {
    if (!grouped[car.brand]) {
      grouped[car.brand] = [];
    }
    grouped[car.brand].push({
      model: car.model,
      year: Number(car.year),
      performance_class: car.performance_class,
      is_premium: car.is_premium === "true",
      is_exclusive: car.is_exclusive === "true",
    });
  });

  return Object.entries(grouped).map(([brand, cars]) => ({
    brand,
    cars,
  }));
});
</script>

<template>
  <RandomizerPageLayout
    title="Рандомные машины"
    :is-loading="!formattedCars.length"
    list-title="Список машин"
  >
    <template #roulette>
      <RouletteWheel
        v-if="formattedCars.length > 0"
        :items="formattedCars"
        :duration="3"
        :options="[
          { key: 'exclude-premium', label: 'Без premium' },
          { key: 'exclude-exclusive', label: 'Без эксклюзивного' },
        ]"
        :compute-fn="getRandomCarItem"
      >
        <template #result="slotProps">
          <p class="winning-car">
            Машина:
            {{
              slotProps.value?.default ??
              (slotProps.value?.brand && slotProps.value?.model
                ? `${slotProps.value.brand} ${slotProps.value.model}`
                : "Не найдено")
            }}
          </p>
        </template>

        <template #item="{ item }">
          <SlotRoulette :title="`${item.brand} ${item.model}`" />
        </template>
      </RouletteWheel>
    </template>

    <template #list>
      <CarList :cars="groupedCars" />
    </template>
  </RandomizerPageLayout>
</template>

<style scoped></style>
