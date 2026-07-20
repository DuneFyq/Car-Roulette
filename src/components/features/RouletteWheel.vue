<script lang="ts" setup>
import { ref, watch, onUnmounted, computed } from "vue";
import Pointer from "@/assets/images/pointer-down-fill-svgrepo-com.svg?component";
import SpinButton from "@/components/ui/SpinButton.vue";
import type { TSlot } from "@/types/TSlot";
import { deepShuffle } from "@/utils/shuffle";
// ----------------------------------------------------------------------------------
type States = Record<string | number, boolean>;
type ComputeFn = (items: TSlot[], states: States) => TSlot;
interface ComponentOption {
  key: string | number;
  default?: boolean;
  label?: string;
}
interface Props {
  items: TSlot[];
  options?: ComponentOption[];
  computeFn: ComputeFn;
  duration?: number;
}
// ----------------------------------------------------------------------------------
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  duration: 3,
});
// ----------------------------------------------------------------------------------
const optionStates = ref<States>({});
const buildStates = (options: ComponentOption[]): States => {
  const states: States = {};
  for (const { key, default: value } of options) {
    if (key === undefined || key === null) continue;
    states[key] = value ?? false;
  }
  return states;
};
watch(
  () => props.options,
  (newOptions) => {
    optionStates.value = buildStates(newOptions);
  },
  { immediate: true, deep: true },
);
// ----------------------------------------------------------------------------------
const shuffledBase = computed(() => {
  if (!props.items || props.items.length === 0) {
    return [{ label: "Тест" }] as any;
  }

  return deepShuffle(props.items);
});

const extendedItems = computed(() => {
  const base = shuffledBase.value;
  const repeats = Math.max(4, Math.ceil(60 / base.length));
  return Array.from({ length: repeats }, () => base).flat();
});
// ----------------------------------------------------------------------------------
const ITEM_WIDTH = 100;
const GAP = 22;

const isSpinning = ref(false);
const targetSlotIndex = ref(0);
watch(
  () => extendedItems.value?.length,
  (newLength) => {
    if (newLength) {
      targetSlotIndex.value = Math.trunc(newLength / 2);
    }
  },
  { immediate: true },
);

const trackStyle = computed(() => {
  const slotLeftEdge = targetSlotIndex.value * (ITEM_WIDTH + GAP);
  const halfItem = ITEM_WIDTH / 2;

  return {
    transform: `translate3d(calc(50% - ${slotLeftEdge}px - ${halfItem}px), 0, 0)`,
    transition: isSpinning.value
      ? `transform ${props.duration}s cubic-bezier(0.25, 1, 0.5, 1)`
      : "none",
  };
});
// ----------------------------------------------------------------------------------
const spinResult = ref<TSlot>({ default: "Сначала прокрутите" } as TSlot);
const result = ref<TSlot>({ default: "Сначала прокрутите" } as TSlot);
const timeLeft = ref(0);
let timerId: ReturnType<typeof setTimeout> | null = null;

const spin = () => {
  if (isSpinning.value) return;

  isSpinning.value = true;
  timeLeft.value = props.duration;
  result.value = { default: "Результат..." };

  let resultValue = props.computeFn(props.items, optionStates.value);
  do {
    resultValue = props.computeFn(props.items, optionStates.value);
  } while (resultValue === result.value);
  spinResult.value = resultValue;

  const winSlot =
    extendedItems.value?.findIndex((item) => item.id === resultValue.id) ?? -1;
  targetSlotIndex.value = winSlot;

  timerId = setTimeout(function tick() {
    timeLeft.value--;
    if (timeLeft.value > 0) {
      timerId = setTimeout(tick, 1000);
    } else {
      result.value = spinResult.value;
      timerId = null;
      isSpinning.value = false;
    }
  }, 1000);
};

const cancelSpin = () => {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
  isSpinning.value = false;
  timeLeft.value = 0;
  targetSlotIndex.value = 0;
};

onUnmounted(cancelSpin);
defineExpose({ cancelSpin });
</script>

<template>
  <div class="roulette-wheel">
    <Pointer class="pointer" />

    <div ref="containerRef" class="wheel-container">
      <div class="wheel-track" :style="trackStyle">
        <template
          v-for="(item, index) in extendedItems"
          :key="`${item.id || 'fallback'}-${index}`"
        >
          <slot name="item" :item="item" :index="index" />
        </template>
      </div>
    </div>
    <div v-if="props.options.length" class="options">
      <label
        v-for="option in props.options"
        :key="option.key"
        class="option-label"
      >
        <input v-model="optionStates[option.key]" type="checkbox" />
        {{ option.label ?? option.key }}
      </label>
    </div>

    <div class="result">
      <slot name="result" :value="result">
        {{ result }}
      </slot>
    </div>

    <SpinButton :is-spinning="isSpinning" :spin="spin" />
  </div>
</template>

<style scoped>
.roulette-wheel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}

.pointer {
  position: relative;
  width: 2.5rem;
  transform: translate3d(0, 1.875rem, 0);
  filter: drop-shadow(0 0 1.25rem rgba(230, 174, 174, 0.3));
  z-index: 10;
}

.wheel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 7.5rem;
}

.wheel-track {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 21.5px;
  height: 100%;
  will-change: transform;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.option-label {
  display: flex;
  gap: 0.3125rem;
  cursor: pointer;
}

.result {
  font-size: 1.5rem;
  font-weight: bold;
  min-height: 2rem;
}
</style>
