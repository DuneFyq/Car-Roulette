<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="layout">
    <Sidebar />

    <div class="body">
      <header class="header">
        <p class="header__text">Тестовый header</p>
      </header>

      <main class="main">
        <h1 class="title">CarRoulette</h1>
        <RouterView />
      </main>

      <footer class="footer">
        <p class="footer__text">Тестовый footer</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex: 1;
  width: 100%;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header,
.footer {
  padding: 1rem 2rem;
}

.spin {
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
