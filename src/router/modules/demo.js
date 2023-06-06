export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/PiniaView.vue'),
  },
  {
    path: '/:w+',
    component: () => import('@/views/NotFound404.vue'),
  },
];
