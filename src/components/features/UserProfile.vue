<script lang="ts" setup>
import TestAvatar from "@/assets/images/avatar.svg?component";

const props = defineProps<{
  username: String;
  rank: String;
}>();
</script>

<template>
  <div class="profile">
    <TestAvatar class="profile-avatar" />
    <div class="profile-info">
      <p class="name">{{ username }}</p>
      <p class="rank">rank: {{ rank }}</p>
      <button class="button-profile">Профиль</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  white-space: nowrap;
}

.profile-avatar {
  width: 3.75rem;
  height: 3.75rem;
  flex-shrink: 0;
  position: relative;
}
</style>
