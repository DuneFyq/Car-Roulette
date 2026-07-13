<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <div class="layout">
    <Sidebar />

    <div class="body">
      <Header class="header" />

      <main class="main">
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
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
  margin: 1.125rem 1.5625rem 1.125rem 1.125rem;
}

.title {
  font-size: 3.125rem;
  font-weight: 700;
}

.header,
.footer {
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  min-height: 70px;
}

.header {
  border-bottom: 1px solid var(--color-bg-secondary);
}

.footer {
  border-top: 1px solid var(--color-bg-secondary);
}

/* Планшеты и мобильные устройства */
@media (max-width: 768px) {
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
