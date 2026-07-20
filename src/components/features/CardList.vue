<script lang="ts" setup>
interface ICardViewItem {
  id: string;
  name: string;
  action: string;
  type?: string;
}

defineProps<{
  cards: ICardViewItem[];
}>();
</script>

<template>
  <ul class="card-list">
    <li v-for="{ id, name, action, type } in cards" :key="id" class="item">
      <div class="content">
        <span class="name">{{ name }}</span>
        <span class="action">{{ action }}</span>
        <span class="type">{{ type }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  background: var(--color-bg-secondary);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 1rem;
  transition: background var(--transition-duration) var(--transition-timing);
}
.item:hover {
  background: var(--color-bg-panel);
}

.content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.name {
  color: var(--accent-neon  );
  font-weight: 600;
}

.action {
  color: var(--text-primary);
}

.type {
  color: var(--text-secondary);
  margin-left: auto;
}
</style>
