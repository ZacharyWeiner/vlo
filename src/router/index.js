import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LockView from "../views/LockView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/lock",
    name: "Lock",
    component: LockView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
