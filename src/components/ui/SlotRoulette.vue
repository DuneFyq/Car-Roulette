<script lang="ts" setup>
interface Props {
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Тест",
});
</script>

<template>
  <div class="slot">
    <p class="title">{{ props.title }}</p>
  </div>
</template>

<style scoped>
.slot {
  background-color: wheat;
  width: 100px;
  height: 100px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0;
  font-size: 14px;
  text-align: center;
}
</style>
