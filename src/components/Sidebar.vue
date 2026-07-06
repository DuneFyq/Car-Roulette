<script lang="ts" setup>
import { useRoute } from "vue-router";
import HomeIcon from "../assets/images/home-svgrepo-com.svg?component";
import RuleIcon from "../assets/images/rule-svgrepo-com.svg?component";
import CarIcon from "../assets/images/car-svgrepo-com.svg?component";
import CardIcon from "../assets/images/cards-svgrepo-com.svg?component";
import LogoutIcon from "../assets/images/logout-svgrepo-com.svg?component";

const route = useRoute();

const menuItems = [
  { to: "/home", icon: HomeIcon, text: "Домой" },
  { to: "/rules", icon: RuleIcon, text: "Правила" },
  { to: "/cars", icon: CarIcon, text: "Машины" },
  { to: "/cards", icon: CardIcon, text: "Карточки" },
];
</script>

<template>
  <aside class="sidebar">
    <div class="inner">
      <header class="header">
        <div class="profile">
          <p class="name">player-1</p>
          <p class="name">rank: bronze-1</p>
        </div>
      </header>

      <nav class="nav">
        <ul class="list">
          <li v-for="item in menuItems" :key="item.to" class="list-item">
            <RouterLink
              :class="{ active: route.path === item.to }"
              class="list-link"
              :to="item.to"
            >
              <component :is="item.icon" class="list-link-icon" />
              <span class="list-link-text">{{ item.text }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <footer class="footer">
        <RouterLink class="logout-link" to="/logout">
          <LogoutIcon class="logout-link-icon" />
          <span class="logout-link-text">Выйти из аккаунта</span>
        </RouterLink>
      </footer>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 16.25rem;
  flex-shrink: 0;
  min-height: 100vh;

  color: var(--text-primary);
  background-color: var(--color-bg-secondary);
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.inner {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1.5rem;
}

.nav {
  overflow-y: auto;
}

.header {
  position: relative;
  margin-bottom: 2.5rem;
}

.list-item {
  margin-bottom: 0.375rem;
}

.list-link {
  color: inherit;
  display: flex;
  align-items: center;
  padding: 1.125rem;
  border-radius: var(--border-radius);
  position: relative;
  transition: color 0.3s ease;
  overflow: hidden;
}

.list-link:hover,
.list-link.active {
  color: var(--color-light);
}
.list-link:hover path,
.list-link.active path {
  fill: var(--color-light);
}

.list-link:hover::before,
.list-link.active::before {
  opacity: 1;
  transform: translateX(0);
}

.list-link:hover::after,
.list-link.active::after {
  opacity: 1;
  transform: translate(-20px, -50%);
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
  background-color: var(--accent-laser);
  z-index: 0;
  transform: translateX(-100%);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  border-radius: var(--border-radius);
}

.list-link::after {
  content: "";
  width: 18px;
  height: 18px;
  background-image: url("../assets/images/arrow-next-svgrepo-com.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 0;
  top: 50%;
  opacity: 0;
  transform: translate(-40px, -50%);
  transition: transform 0.8s ease-out;
}

.list-link-icon {
  width: 1.5rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.list-link-text {
  font-size: 1.125rem;
  margin-left: 1.125rem;
  position: relative;
  z-index: 2;
}

.logout-link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: 0.875rem;
  overflow: hidden;
  border-radius: 0.75rem;
  padding: 1.125rem;
  transition: background-color 0.3s ease;
}
.logout-link:hover,
.logout-link:active {
  background-color: var(--accent-laser);
}

.logout-link-icon {
  width: 1.125rem;
  flex-shrink: 0;
}

.logout-link-text {
  color: inherit;
  margin-left: 0.75rem;
}

.footer {
  text-align: center;
  padding: 0.625rem 0;
  margin-top: auto;
}
</style>
