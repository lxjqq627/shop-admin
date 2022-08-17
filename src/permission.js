import router from '~/router'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/utils'
import store from './store'

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const token = getToken();

  // 没有登录强制跳转回登录页面
  if(!token && to.path !== '/login'){
    toast('请先登录','error')
    return next({ path: '/login'})
  }

  // 防止重复登录
  if(token && to.path === '/login'){
    toast('请勿重复登录','error')
    return next({ path: from.path || '/'})
  }

  // 如果用户登录 自动获取用户信息 存在vuex中
  if(token){
    await store.dispatch('getinfo')
  }

  next()

})