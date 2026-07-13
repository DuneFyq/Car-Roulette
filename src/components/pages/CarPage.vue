<script lang="ts" setup>
import RouletteWheel from "@/components/features/RouletteWheel.vue";
import CarList from "@/components/features/CarList.vue";

import SlotRoulette from "@/components/ui/SlotRoulette.vue";
import RandomizerPageLayout from "@/components/layout/RandomizerPageLayout.vue";

import { onMounted, computed } from "vue";

import type { TCarEntry } from "@/types/TCar";
import { useCarStore } from "@/stores/car";
import { randomFromArray } from "@/utils/randomUtils";

const getRandomCarItem = (
  items: unknown[],
  optionStates: Record<string | number, boolean>,
) => {
  if (!items || items.length === 0) {
    return "Машина не найдена";
  }

  const selectedItem = randomFromArray(items) as TCarEntry;
  const brand = selectedItem?.brand ?? "";
  const cars = selectedItem?.cars ?? [];

  const filtered = cars.filter((car) => {
    if (optionStates["exclude-premium"] && car.is_premium) return false;
    if (optionStates["exclude-exclusive"] && car.is_exclusive) return false;
    return true;
  });

  if (filtered.length === 0) {
    return `${brand} — подходящих машин не найдено`;
  }

  const randomCar = randomFromArray(filtered);
  return `${brand} ${randomCar.model}`;
};

const store = useCarStore();
onMounted(() => {
  store.loadCards();
});

const formattedCars = computed(() => {
  return store.cars.map((car, index) => {
    const [brand, cars] = Object.entries(car)[0];
    const carsArray = Array.isArray(cars) ? cars : [];

    return {
      id: `${index}-${brand}-${cars}`,
      brand,
      cars: carsArray,
    };
  });
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
        v-if="formattedCars && formattedCars.length > 0"
        :items="formattedCars"
        :options="[
          { key: 'exclude-premium', label: 'Без premium' },
          { key: 'exclude-exclusive', label: 'Без экслюзивного' },
        ]"
        :compute-fn="getRandomCarItem"
      >
        <template #result="slotProps">
          <p class="winning-car">Машина: {{ slotProps.value }}</p>
        </template>

        <template #items>
          <template v-for="{ id, brand, cars } in formattedCars" :key="id">
            <SlotRoulette
              v-for="({ model }, index) in cars"
              :key="`${id}-${index}`"
              :title="`${brand} ${model}`"
            />
          </template>
        </template>
      </RouletteWheel>
    </template>

    <template #list>
      <CarList :cars="formattedCars" />
    </template>
  </RandomizerPageLayout>
</template>

<style scoped></style>
