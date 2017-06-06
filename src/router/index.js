import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Goods from '@/components/good/good'
import ratings from '@/components/rating/rating'
import business from '@/components/business/business'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: Index,
      children:[
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'ratings',
        component: ratings
      },
      {
        path: 'business',
        component: business
      }]
    }
  ],
  linkActiveClass: 'active'
})
