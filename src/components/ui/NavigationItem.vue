<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { Component } from "vue";

interface MenuItem {
  to: string;
  icon: Component;
  text: string;
}

const props = defineProps<{
  item: MenuItem;
}>();

const route = useRoute();

const isActive = computed(() => route.name === props.item.to);
</script>

<template>
  <li class="list-item">
    <RouterLink
      :to="{ name: item.to }"
      :class="{ active: isActive }"
      class="list-link"
    >
      <component :is="item.icon" class="list-link-icon" />
      <span class="list-link-text">{{ item.text }}</span>
    </RouterLink>
  </li>
</template>

<style scoped>
.list-item {
  --list-gap: clamp(0.25rem, 0.1389rem + 0.2315vw, 0.3125rem);
  --list-padding: clamp(0.5rem, 0.3519rem + 0.7407vw, 1rem)
    clamp(0.75rem, 0.4891rem + 0.8696vw, 1.25rem);
  --list-radius: var(--border-radius);
  --list-font-size: clamp(0.875rem, 0.8009rem + 0.3704vw, 1.125rem);
  --list-icon-size: 1.5rem;
  --list-icon-gap: clamp(0.5rem, 0.3295rem + 0.8523vw, 0.875rem);

  --list-hover-color: var(--color-light);
  --list-hover-bg: var(--accent-laser);

  --arrow-size: 1.25rem;
  --arrow-url: url("@/assets/images/arrow-next-svgrepo-com.svg");

  --arrow-offset-rest: -2rem;
  --arrow-offset-hover: 0.5rem;

  --anim-speed-fast: 0.2s;
  --anim-speed-slow: 0.8s;
}

/* Планшеты и крупные телефоны (max-width: 768px) */
@media (width <= 768px) {
  .list-link::after {
    display: none;
  }
}

.list-item {
  margin-bottom: var(--list-gap);
}

.list-link {
  color: inherit;
  display: flex;
  align-items: center;
  padding: var(--list-padding);
  border-radius: var(--list-radius);
  position: relative;
  transition: color var(--anim-speed-normal, 0.3s) ease;
  overflow: hidden;
  text-decoration: none;
}

.list-link:hover,
.list-link.active {
  color: var(--list-hover-color);
}

.list-link:hover path,
.list-link.active path {
  fill: var(--list-hover-color);
}

.list-link:hover::before,
.list-link.active::before {
  opacity: 1;
  transform: translateX(0);
}

.list-link:hover::after,
.list-link.active::after {
  filter: brightness(0) invert(1);
  opacity: 1;
  transform: translate(var(--arrow-offset-hover), -50%);
}

.list-link::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  opacity: 0;
  background: var(--list-hover-bg);
  z-index: 0;
  transform: translateX(-100%);
  transition:
    transform var(--anim-speed-fast) ease,
    opacity var(--anim-speed-fast) ease;
  border-radius: var(--list-radius);
}

.list-link::after {
  content: "";
  width: var(--arrow-size);
  height: var(--arrow-size);
  background-image: var(--arrow-url);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 1rem;
  top: 50%;
  opacity: 0;
  transform: translate(var(--arrow-offset-rest), -50%);
  transition:
    transform var(--anim-speed-slow) ease-out,
    opacity var(--anim-speed-fast) ease;
  filter: brightness(0) invert(1);
}

.list-link-icon {
  width: var(--list-icon-size);
  height: var(--list-icon-size);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.list-link-text {
  font-size: var(--list-font-size);
  margin-left: var(--list-icon-gap);
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
