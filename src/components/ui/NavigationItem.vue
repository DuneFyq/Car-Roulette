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
const isActive = computed(() => route.path === props.item.to);
</script>

<template>
  <li class="list-item">
    <RouterLink :to="item.to" :class="{ active: isActive }" class="list-link">
      <component :is="item.icon" class="list-link-icon" />
      <span class="list-link-text">{{ item.text }}</span>
    </RouterLink>
  </li>
</template>

<style scoped>
.list-item {
  --list-gap: 0.375rem;
  --list-padding: 1.125rem;
  --list-radius: var(--border-radius);
  --list-font-size: 1.125rem;
  --list-icon-size: 1.5rem;
  --list-icon-gap: 1.125rem;

  --list-color: inherit;
  --list-hover-color: var(--color-light);
  --list-hover-bg: var(--accent-laser);

  --arrow-size: 1.125rem;
  --arrow-url: url("@/assets/images/arrow-next-svgrepo-com.svg");
  --arrow-offset-rest: -2.5rem;
  --arrow-offset-hover: -1.25rem;

  --anim-speed-fast: 0.2s;
  --anim-speed-slow: 0.8s;
}

/* Широкие мониторы (max-width: 1400px) */
@media (max-width: 1400px) {
  .list-item {
    --list-padding: 1rem 1.25rem;
    --list-font-size: 1.1rem;
    --arrow-offset-rest: -2.25rem;
  }
}

/* Стандартные ноутбуки (max-width: 1200px) */
@media (max-width: 1200px) {
  .list-item {
    --list-gap: 0.3125rem;
    --list-padding: 0.95rem 1.125rem;
    --list-font-size: 1.05rem;
    --arrow-size: 1rem;
    --arrow-offset-rest: -2rem;
    --arrow-offset-hover: -1rem;
  }
}

/* Ноутбуки и большие планшеты (max-width: 1024px) */
@media (max-width: 1024px) {
  .list-item {
    --list-padding: 0.875rem;
    --list-font-size: 1rem;
    --list-icon-size: 1.25rem;
    --list-icon-gap: 0.875rem;
    --arrow-size: 0.875rem;
    --arrow-offset-rest: -1.75rem;
    --arrow-offset-hover: -0.75rem;
  }
}

/* Планшеты и крупные телефоны (max-width: 768px) */
@media (max-width: 768px) {
  .list-item {
    --list-padding: 0.75rem;
    --list-font-size: 0.95rem;
    --list-gap: 0.25rem;
  }

  .list-link::after {
    display: none;
  }
}

/* Мобильные телефоны (max-width: 480px) */
@media (max-width: 480px) {
  .list-item {
    --list-padding: 0.625rem 0.75rem;
    --list-icon-size: 1.1rem;
    --list-icon-gap: 0.625rem;
  }
}

/* Микро-смартфоны (max-width: 320px) */
@media (max-width: 320px) {
  .list-item {
    --list-padding: 0.5rem;
    --list-font-size: 0.875rem;
    --list-icon-size: 1rem;
    --list-icon-gap: 0.5rem;
  }
}

.list-item {
  margin-bottom: var(--list-gap);
}

.list-link {
  color: var(--list-color);
  display: flex;
  align-items: center;
  padding: var(--list-padding);
  border-radius: var(--list-radius);
  position: relative;
  transition: color var(--anim-speed-normal) ease;
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
  background-color: var(--list-hover-bg);
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
  right: 0;
  top: 50%;
  opacity: 0;
  transform: translate(var(--arrow-offset-rest), -50%);
  transition: transform var(--anim-speed-slow) ease-out;
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
