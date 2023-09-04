import { createApp } from 'vue';
import { createRouter, createWebHashHistory} from 'vue-router';
import 'element-plus/theme-chalk/display.css';
import './style.css';
import App from './App.vue';
import Home from './views/Home.vue';

const routes = [
  { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount('#app');
