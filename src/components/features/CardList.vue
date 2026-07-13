<script lang="ts" setup>
interface ICardViewItem {
  id: string;
  name: string;
  action: string;
  type: string;
}

defineProps<{ cards: ICardViewItem[] }>();
</script>

<template>
  <ul class="list-card">
    <li v-for="({ id, name, action }, index) in cards" :key="id">
      {{ index + 1 }}. {{ name }} - {{ action }}
    </li>
  </ul>
</template>

<style scoped>
.list-card {
  text-align: left;
}
</style>
