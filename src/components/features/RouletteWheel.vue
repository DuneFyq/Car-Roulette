<script lang="ts" setup>
import { ref, watch, onUnmounted, computed } from "vue";
import Pointer from "@/assets/images/pointer-down-fill-svgrepo-com.svg?component";
import SlotRoulette from "@/components/ui/SlotRoulette.vue";
// ----------------------------------------------------------------------------------
type States = Record<string | number, boolean>;
type ComputeFn = (items: unknown[], states: States) => string;
interface ComponentOption {
  key: string | number;
  default?: boolean;
  label?: string;
}
interface Props {
  items: unknown[];
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
const extendedItems = computed(() => {
  const base = props.items.length ? props.items : [{ label: "Тест" }];
  const repeats = Math.max(4, Math.ceil(60 / base.length));
  return Array.from({ length: repeats }, () => base).flat();
});
// ----------------------------------------------------------------------------------
const isSpinning = ref(false);
const currentShift = ref(0);

const trackStyle = computed(() => ({
  transform: `translate3d(-${currentShift.value}px, 0, 0)`,
  transition: isSpinning.value
    ? "transform 4s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none",
}));
// ----------------------------------------------------------------------------------
const spinResult = ref<string>("Прокрутите");
const result = ref<string>("Прокрутите");
const timeLeft = ref(0);
let timerId: ReturnType<typeof setTimeout> | null = null;

const containerRef = ref<HTMLDivElement | null>(null);

const countItems = (items: unknown) => {
  if (!items) return 0;
  if (typeof items !== "object") return 0;

  if (Array.isArray(items)) {
    if (items.length > 0 && Array.isArray(items[0])) {
      return items.reduce((sum, arr) => sum + countItems(arr), 0);
    }
    return items.length;
  }

  return Object.values(items).reduce((sum, val) => {
    if (Array.isArray(val)) return sum + val.length;
    return sum;
  }, 0);
};

function getShift(slotNumber: number) {
  const ITEM_WIDTH = 100;
  const GAP = 27.5;

  const slotLeftEdge = slotNumber * (ITEM_WIDTH + GAP);
  const slotCenter = slotLeftEdge + ITEM_WIDTH / 2;

  const containerWidth = containerRef.value
    ? containerRef.value.clientWidth
    : 800;
  const rouletteCenter = containerWidth / 2;

  return slotCenter - rouletteCenter;
}

const spin = () => {
  if (isSpinning.value) return;

  isSpinning.value = true;
  timeLeft.value = props.duration;

  spinResult.value = props.computeFn(props.items, optionStates.value);

  console.log(props.items);
  currentShift.value = getShift(countItems(props.items));

  timerId = setTimeout(function tick() {
    timeLeft.value--;
    if (timeLeft.value > 0) {
      timerId = setTimeout(tick, 1000);
    } else {
      result.value = spinResult.value;
      timerId = null;
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
  currentShift.value = 0;
};

onUnmounted(cancelSpin);
defineExpose({ cancelSpin });
</script>

<template>
  <div class="roulette-wheel">
    <Pointer class="pointer" />

    <div ref="containerRef" class="wheel-container">
      <div class="wheel-track" :style="trackStyle">
        <slot name="items" :items="extendedItems" :result="spinResult">
          <!-- Слоты -->
        </slot>
        <SlotRoulette :key="spinResult" :title="spinResult" />
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
      <p class="test-wait">Таймер: {{ timeLeft }} секунд</p>
      <slot name="result" :value="result">
        {{ result }}
      </slot>
    </div>

    <button @click="spin" class="spin-button" :disabled="isSpinning">
      {{ isSpinning ? "Крутится..." : "Крутить" }}
    </button>
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
  gap: 1.7188rem;
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

.spin-button {
  font-size: 1.25rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-gray-300);
}

.spin-button:hover:not(:disabled) {
  background: var(--color-gray-400);
}

.spin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
