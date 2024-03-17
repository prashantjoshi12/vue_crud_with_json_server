import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Register from '@/views/Register.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requireAuth : true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        requireGuest : true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requireGuest : true
      }
    },
    
  ]
})

router.beforeEach((to ,from, next)=>{
  const isLogin = JSON.parse(localStorage.getItem('isLoggedIn'))
  console.log(to.meta)
 if(to.meta.requireAuth && !isLogin){
  return next({name : 'login'})
 }else{
   return next()
 }
})

export default router
