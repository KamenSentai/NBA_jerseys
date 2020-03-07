const routes = [
  {
    path: '',
    redirect: {
      name: 'home',
    },
  },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
  },
]

export default routes
