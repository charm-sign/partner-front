import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from "@/stores/user";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      // @代表src目录
      component: () => import('@/layout/Layout.vue'),
      redirect: "/home",//将父子路由都加载出来
      children: [   //子路由
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'personal', 
          name: 'Personal',
          component: () => import('@/views/PersonalCenter.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
   
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/:pathMatch(.*)',//匹配所有未知路由 ，重定向至404
      name: '404',
      component: () => import('@/views/404.vue')
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const user = store.loginInfo.user//获取stroe中存储的user
  const hasUser = user && user.id
  const noPermissionPaths = ['/login', '/register']//定义无需登录的路由
  // debugger
  if (!hasUser && !noPermissionPaths.includes(to.path)) { //没有用户信息且去的页面不是login页面，让其登录
    next('/login')
  } else {
    next()
  }

})


export default router
