import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/pages/Home.vue"),
    name: "home",
  },
  {
    path: "/rules",
    component: () => import("@/components/pages/RulePage.vue"),
    name: "page.rule",
  },
  {
    path: "/cars",
    component: () => import("@/components/pages/CarPage.vue"),
    name: "page.car",
  },
  {
    path: "/cards",
    component: () => import("@/components/pages/CardPage.vue"),
    name: "page.card",
  },
  {
    path: "/logout",
    component: () => import("@/components/pages/LogoutPage.vue"),
    name: "page.logout",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
