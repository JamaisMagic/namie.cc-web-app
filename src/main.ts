import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'normalize.css';
import 'element-plus/theme-chalk/display.css';
import './style.css';
import { routes } from './routes.ts';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount('#app');
