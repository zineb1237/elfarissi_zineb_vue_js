import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import AddEmploi from '../views/AddEmploi.vue';
import EditEmploi from '../views/EditEmploi.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/add', component: AddEmploi },
  { path: '/edit/:id', component: EditEmploi, props: true }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
