<script lang="ts" setup>
import RouletteWheel from "@/components/features/RouletteWheel.vue";
import CardList from "@/components/features/CardList.vue";

import SlotRoulette from "@/components/ui/SlotRoulette.vue";
import RandomizerPageLayout from "@/components/layout/RandomizerPageLayout.vue";

import { computed } from "vue";
import { useCardStore } from "@/stores/card";
import type { TCard } from "@/types/TCard";
import { randomFromArray } from "@/utils/randomUtils";
import { useStoreInit } from "@/composables/useStoreInit";

const getRandomCardItem = (items: unknown[]) => {
  const randomCard = randomFromArray(items) as TCard;
  return String(randomCard.name ?? "Карточка не найдена");
};

const store = useCardStore();
useStoreInit(store);

const formattedCards = computed(() => {
  return store.cards.map((card) => {
    const [name, content] = Object.entries(card)[0];

    return {
      id: `${name}-${content.action}-${content.type}`,
      name,
      ...content,
    };
  });
});
</script>

<template>
  <RandomizerPageLayout
    title="Рандомные карточки"
    :is-loading="!formattedCards.length"
    list-title="Список всех карточек"
  >
    <template #roulette>
      <RouletteWheel
        v-if="formattedCards && formattedCards.length > 0"
        :items="formattedCards"
        :compute-fn="getRandomCardItem"
      >
        <template #result="slotProps">
          <p class="winning-car">Карточки: {{ slotProps.value }}</p>
        </template>

        <template #items>
          <SlotRoulette
            v-for="({ id, name }, index) in formattedCards"
            :key="id"
            :title="name + index"
          />
        </template>
      </RouletteWheel>
    </template>

    <template #extra>
      <h3 class="list-title">Список имеющихся карт</h3>
      <ul class="list-available-cards">
        <li v-for="{ name } in formattedCards" :key="name">{{ name }}</li>
      </ul>
    </template>

    <template #list>
      <CardList :cards="formattedCards" />
    </template>
  </RandomizerPageLayout>
</template>

<style scoped></style>
