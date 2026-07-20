<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";

import HomeIcon from "@/assets/images/home-svgrepo-com.svg?component";
import RuleIcon from "@/assets/images/rule-svgrepo-com.svg?component";
import CarIcon from "@/assets/images/car-svgrepo-com.svg?component";
import CardIcon from "@/assets/images/cards-svgrepo-com.svg?component";

import BurgerSingleIcon from "@/assets/images/arrow-next-svgrepo-com.svg?component";
import ExpandIcon from "@/assets/images/burger-simple-svgrepo-com.svg?component";

import LogoutButton from "@/components/ui/LogoutButton.vue";
import NavigationItem from "@/components/ui/NavigationItem.vue";
import Profile from "@/components/features/UserProfile.vue";

const profile = reactive({
  username: "player",
  rank: "bronze I",
});

const isDark = useDark({
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);

const menuItems = [
  { to: "home", icon: HomeIcon, text: "Домой" },
  { to: "page.rule", icon: RuleIcon, text: "Правила" },
  { to: "page.car", icon: CarIcon, text: "Машины" },
  { to: "page.card", icon: CardIcon, text: "Карточки" },
];

const isMinify = ref(false);
</script>

<template>
  <aside class="sidebar" :class="{ minify: isMinify }">
    <header class="header">
      <Profile :username="profile.username" :rank="profile.rank" />

      <button class="minify-button" @click="isMinify = !isMinify">
        <component
          :is="isMinify ? ExpandIcon : BurgerSingleIcon"
          class="icon"
        />
      </button>

      <button class="theme-toggle-button" @click="toggleDark()">
        <span>{{ isDark ? "Dark" : "Light" }}</span>
      </button>
    </header>

    <nav class="nav">
      <ul class="list">
        <NavigationItem v-for="item in menuItems" :key="item.to" :item="item" />
      </ul>
    </nav>

    <footer class="footer">
      <LogoutButton />
    </footer>
  </aside>
</template>

<style scoped>
.sidebar {
  --sidebar-width: clamp(14rem, 18vw, 16.7rem);
  --sidebar-margin-base: clamp(1rem, 1.2vw + 0.5rem, 1.5rem);
  --sidebar-padding: clamp(1rem, 2vw, 1.5rem);
}

.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  flex-shrink: 0;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  padding: var(--sidebar-padding);
  color: var(--text-primary);
  background-color: var(--color-bg-secondary);

  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.icon {
  width: 24px;
  height: 24px;
  color: var(--text-primary);
  flex-shrink: 0;
}

.theme-toggle-button {
  background: var(--accent);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.nav {
  overflow-y: auto;
  flex-grow: 1;
}

.header {
  position: relative;
  margin-bottom: calc(var(--sidebar-margin-base) + 1rem);
}

.footer {
  text-align: center;
  padding: 0.625rem 0;
  margin-top: auto;
}

.minify-button {
  display: none;
}

/* Планшеты и мобильные устройства */
@media (width <= 768px) {
  .sidebar {
    --sidebar-width: 100%;
    --sidebar-padding-y: 0.75rem;
    --sidebar-padding-x: 1rem;
    --sidebar-padding: var(--sidebar-padding-y) var(--sidebar-padding-x);
  }

  .sidebar {
    position: relative;

    height: auto;
    max-height: 500px;
    overflow: hidden;
    transition:
      max-height 0.4s ease-in-out,
      background-color 0.4s ease;
  }

  .sidebar .nav {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  .minify-button {
    display: block;
  }

  .sidebar.minify {
    max-height: 130px;
  }

  .sidebar.minify .nav {
    opacity: 0;
    pointer-events: none;
  }

  .nav {
    overflow-y: visible;
    flex-grow: 0;
  }

  .header {
    margin-bottom: 5px;
  }

  .footer {
    display: none;
  }
}
</style>
