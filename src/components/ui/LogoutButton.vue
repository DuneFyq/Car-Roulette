<script lang="ts" setup>
import LogoutIcon from "@/assets/images/logout-svgrepo-com.svg?component";
</script>

<template>
  <RouterLink :to="{ name: 'page.logout' }" class="logout-link">
    <LogoutIcon class="logout-link-icon" />
    <span class="logout-link-text">Выйти из аккаунта</span>
  </RouterLink>
</template>

<style scoped>
.logout-link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: clamp(0.800rem, 0.7659rem + 0.1705vw, 0.813rem);
  overflow: hidden;
  border-radius: 0.75rem;
  padding: 1.125rem;
  transition: background-color 0.3s ease;
}
.logout-link:hover,
.logout-link:active {
  background: var(--accent-laser);
}

.logout-link-icon {
  width: 1.5625rem;
  height: 1.5625rem;
  flex-shrink: 0;
}

.logout-link-text {
  color: inherit;
  margin-left: .5em;
}
</style>
