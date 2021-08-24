import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
      }, {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
      }
    ]
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to.name是登录路由的名字
  if (to.name !== 'Login') {
    // token思路就是登录成功之后保存起来，然后下面拿来用
    const token = sessionStorage.getItem('token')
    // 判断token是否已经保存了
    if (token) {
      // 成功跳转
      next()
    } else {
      Vue.prototype.$message({
        type: 'error',
        message: '请先登录'
      })
      next('/')
    }
  } else {
    // 不能把所有路由都拦截拦，要留个登陆路由
    next()
  }
})

export default router
