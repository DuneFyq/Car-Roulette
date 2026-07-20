<script lang="ts" setup>
import RouletteWheel from "@/components/features/RouletteWheel.vue";
import CardList from "@/components/features/CardList.vue";

import SlotRoulette from "@/components/ui/SlotRoulette.vue";
import RandomizerPageLayout from "@/components/layout/RandomizerPageLayout.vue";

import { computed, onMounted } from "vue";
import { useCardStore } from "@/stores/card";
import { randomFromArray } from "@/utils/randomUtils";

import type { TSlot } from "@/types/TSlot";

defineOptions({
  name: "page.card",
});

const getRandomCardItem = (items: TSlot[]): TSlot => {
  return randomFromArray(items);
};

const store = useCardStore();
onMounted(() => {
  store.loadCards?.();
});

const formattedCards = computed(() => {
  return store.cards.map((card) => {
    const [name, content] = Object.entries(card)[0];

    return {
      id: `${name}-${content?.action}-${content?.type}`,
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
        :duration="5"
        :compute-fn="getRandomCardItem"
      >
        <template #result="slotProps">
          <p class="winning-card">
            Карточка:
            {{
              slotProps.value?.name ?? slotProps.value?.default ?? "Не найдено"
            }}
          </p>
        </template>

        <template #item="{ item }">
          <SlotRoulette :title="item.name ?? item.label ?? 'Элемент'" />
        </template>
      </RouletteWheel>
    </template>

    <template #extra>
      <h3 class="list-title">Список имеющихся карт</h3>
      <ul class="list-available-cards">
        <li v-for="card in formattedCards" :key="card.id">{{ card.name }}</li>
      </ul>
    </template>

    <template #list>
      <CardList :cards="formattedCards" />
    </template>
  </RandomizerPageLayout>
</template>

<style scoped>
.list-title {
  font-size: clamp(1.125rem, 0.8977rem + 1.1364vw, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
  margin: 0.5em;
}

.list-available-cards {
  font-size: clamp(0.625rem, 0.4886rem + 0.6818vw, 1rem);
  text-align: left;
  line-height: 1.6;
  margin-top: 0.625em;
  padding: 1em;

  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}
</style>
