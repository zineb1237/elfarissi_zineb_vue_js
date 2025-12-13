import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/AuthForm.vue";
import Events from "../components/EventsList.vue";

const routes = [
  { path: "/", component: Auth },
  { path: "/events", component: Events }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
