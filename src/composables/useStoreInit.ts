import { onMounted } from 'vue';

export const useStoreInit = (store: any) => {
  onMounted(() => {
    if (store.loadCards) store.loadCards();
    if (store.loadCars) store.loadCars();
  });
};