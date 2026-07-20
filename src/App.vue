<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <div class="layout">
    <Sidebar class="sidebar" />

    <div class="body">
      <Header class="header" />

      <main class="main">
        <RouterView v-slot="{ Component }">
          <KeepAlive :include="['page.car', 'page.card']">
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>

      <Footer class="footer" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  box-shadow: var(--box-shadow-base);
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
  margin: 1.5rem;
}

.header,
.footer {
  box-shadow: var(--box-shadow-base);
  padding: 1rem 2rem;
  min-height: 70px;
}

.header {
  border-bottom: 1px solid var(--color-bg-secondary);
}

.footer {
  border-top: 1px solid var(--color-bg-secondary);
}

/* Планшеты и мобильные устройства */
@media (width <= 768px) {
  .layout {
    flex-direction: column;
  }

  .main {
    justify-content: flex-start;
    margin: 1rem;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .header,
  .footer {
    padding: 1rem;
  }
}
</style>
