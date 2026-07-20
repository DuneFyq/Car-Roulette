<script lang="ts" setup></script>

<template>
  <section class="home page">
    <h2 class="title">Главная страница</h2>
    <p class="text">
      Car Roulette — это сайт, который превращает Forza Horizon 6 в
      мультиплеерную карточную гонку. Ты получаешь случайную машину через
      рулетку и с помощью карт, баффов и подстав сражаешься в 9 разных
      дисциплинах, чтобы набрать максимум очков. Чтобы понять все детали
      механики, обязательно прочитай правила.
    </p>
    <p class="text">
      Сайт управляет только мета-игрой (выдача машин, карты, подсчёт баллов), но
      не контролирует саму гонку. Всё, что происходит на трассе — заезды,
      столкновения, финиш — вы делаете сами в Forza Horizon, а Судья лишь
      фиксирует результаты.
    </p>
  </section>
</template>

<style scoped>
.home {
  --font-size-title: clamp(1.25rem, 0.8864rem + 1.8182vw, 2.25rem);
  --font-size-text: clamp(0.625rem, 0.4886rem + 0.6818vw, 1rem);
}

.title {
  text-align: center;
  font-size: var(--font-size-title);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5em;
}

.text {
  font-size: var(--font-size-text);
  line-height: 1.5;
  margin: 0.25em 0 0.5em;
  text-align: justify;
}
</style>
