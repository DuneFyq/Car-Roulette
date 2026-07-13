<template>
  <footer class="footer">
    <span>© 2026 Car Roulette</span>
    <nav class="footer-nav">
      <a href="#">О проекте</a>
      <a href="#">Контакты</a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
}

.footer-nav {
  display: flex;
  gap: .625rem;
}
</style>
