<script lang="ts" setup>
import Button from "../components/Button.vue";
import Roulette from "../components/Roulette.vue";
import History from "../components/History.vue";
</script>

<template>
  <section class="section card-page">
    <h2 class="title">Рандомные карточки</h2>
    <div class="spin">
      <Roulette />
      <Button>Крутить</Button>
    </div>
    <History />
  </section>
</template>