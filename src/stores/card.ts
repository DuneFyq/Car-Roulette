import type { ICardsResponse, TCard, TCardContent } from "@/types/TCard";
import axios from "axios";
import { defineStore } from "pinia";

export const useCardStore = defineStore("cards", {
  state: () => ({
    cards: [] as TCard[],
    loading: false,

    totalElements: 0,
  }),

  actions: {
    async loadCards() {
      this.loading = true;
      try {
        const response = await axios.get<ICardsResponse>(
          "http://localhost:3000/cards",
        );
        const { count, ...onlyCards } = response.data;

        this.totalElements = count;
        this.cards = Object.entries(onlyCards).map(([name, content]) => ({
          [name]: content as TCardContent,
        }));
      } catch (error) {
        console.error("Ошибка загрузки карточек:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
