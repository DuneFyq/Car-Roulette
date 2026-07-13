import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/pages/Home.vue";
import RulePage from "@/components/pages/RulePage.vue";
import CarPage from "@/components/pages/CarPage.vue";
import CardPage from "@/components/pages/CardPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/rules", component: RulePage },
  { path: "/cars", component: CarPage },
  { path: "/cards", component: CardPage },
  { path: "/logout", component: RulePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
