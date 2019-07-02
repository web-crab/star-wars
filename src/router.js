import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/people'
    },
    {
      path: '/people',
      name: 'people',
      props: { moduleName: 'people' },
      component: () => import('@/views/ListView')
    },
    {
      path: '/people/:id',
      name: 'person',
      props: true,
      component: () => import('@/views/PersonView')
    }
  ],
  scrollBehavior: (to, from, saved) => saved || ({ x: 0, y: 0 })
})
