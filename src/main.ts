import { createApp } from "vue";
import "normalize.css";
import "./global.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import RulePage from "./pages/RulePage.vue";
import CarPage from "./pages/CarPage.vue";
import CardPage from "./pages/CardPage.vue";

const app = createApp(App);

const routes = [
  { path: "/rules", component: RulePage },
  { path: "/cars", component: CarPage },
  { path: "/cards", component: CardPage },
  { path: "/logout", component: RulePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.mount("#app");
