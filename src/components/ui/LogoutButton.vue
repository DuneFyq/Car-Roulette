<script lang="ts" setup>
import LogoutIcon from "@/assets/images/logout-svgrepo-com.svg?component";

const handleLogout = () => {
  console.log("logout");
};
</script>

<template>
  <button class="logout-link" @click="handleLogout">
    <LogoutIcon class="logout-link-icon" />
    <span class="logout-link-text">Выйти из аккаунта</span>
  </button>
</template>

<style scoped>
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
</style>
