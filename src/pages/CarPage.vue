<script lang="ts" setup>
import Button from "../components/Button.vue";
import Roulette from "../components/Roulette.vue";
import History from "../components/History.vue";
</script>

<template>
  <section class="section car-page">
    <h2 class="title">Рандомные машины</h2>
    <div class="spin">
      <Roulette />
      <Button>Крутить</Button>
    </div>
    <History />
  </section>
</template>
