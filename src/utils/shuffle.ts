const shuffleArray = <T>(items: T[]): T[] => {
  const copiedItems = [...items];
  let m = copiedItems.length;

  while (m) {
    const i = Math.floor(Math.random() * m--);
    const t = copiedItems[m];
    copiedItems[m] = copiedItems[i];
    copiedItems[i] = t;
  }
  return copiedItems;
};

/**
 * Глубокая рекурсивная функция перемешивания.
 * Перемешивает сам массив, а также любые массивы внутри его элементов
 * (как массивы в массиве, так и массивы внутри свойств объектов).
 */
export const deepShuffle = <T>(items: T[]): T[] => {
  const shuffledItems = shuffleArray(items);
  return shuffledItems.map((item) => {
    if (Array.isArray(item)) {
      return deepShuffle(item);
    }

    if (item !== null && typeof item === "object") {
      const newItem = { ...item } as any;

      for (const key in newItem) {
        if (Array.isArray(newItem[key])) {
          newItem[key] = deepShuffle(newItem[key]);
        }
      }
      return newItem;
    }
    return item;
  }) as T[];
};
