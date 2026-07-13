import type { ICarsResponse, TCar, TCarContent } from "@/types/TCar";
import axios from "axios";
import { defineStore } from "pinia";

export const useCarStore = defineStore("cars", {
  state: () => ({
    cars: [] as TCar[],
    loading: false,

    totalElements: 0,
  }),

  actions: {
    async loadCards() {
      this.loading = true;
      try {
        const response = await axios.get<ICarsResponse>(
          "http://localhost:3000/cars",
        );
        const { count, ...onlyCars } = response.data;

        this.totalElements = count;
        this.cars = Object.entries(onlyCars).map(([name, content]) => ({
          [name]: content as TCarContent,
        }));
      } catch (error) {
        console.error("Ошибка загрузки карточек:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
