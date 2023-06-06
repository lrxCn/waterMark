import { createRouter, createWebHashHistory } from 'vue-router';

import demoRouters from './modules/demo';

const routes = [...demoRouters];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
