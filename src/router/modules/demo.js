export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/:w+',
    component: () => import('@/views/NotFound404.vue'),
  },
];
