import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CustomerView from '../views/CustomerView.vue'
import SignIn from '../components/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/customers',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/signIn', 
      name: 'signIn',
      component: SignIn
    },

  ]
});

export default router
