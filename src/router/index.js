import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LockView from "../views/LockView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import LogoutView from "../views/LogoutView.vue";
import PaymentView from "../views/PaymentView.vue";
import PricingView from "../views/PricingView.vue";
import SuccessfulPayment from "../views/SuccessfulPayment.vue";

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
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutView,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: PricingView,
  },
  {
    path: "/payments",
    name: "Payment",
    component: PaymentView,
  },
  {
    path: "/payment-success",
    name: "SuccessfulPayment",
    component: SuccessfulPayment,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
