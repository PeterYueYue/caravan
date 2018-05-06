import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import finish from '@/components/finish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/finish',
      name: 'finish',
      component: finish
    }
  ]
})
