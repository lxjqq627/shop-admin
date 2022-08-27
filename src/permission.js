import { router, addRoutes } from "~/router";
import { getToken } from "~/composables/auth";
import { toast, showFullLoading, hideFullLoading } from "~/composables/utils";
import store from "./store";

// 全局路由守卫
let hasGetInfo = false; // 防止重复加载信息接口
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading();

  // to and from are both route objects. must call `next`.
  const token = getToken();

  // 没有登录强制跳转回登录页面
  if (!token && to.path !== "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path === "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path || "/" });
  }

  let hasNewRoutes = false;
  // 如果用户登录 自动获取用户信息 存在vuex中
  if (token && !hasGetInfo) {
    let { menus } = await store.dispatch("getinfo");
    hasGetInfo = true;
    // 动态添加路由
    hasNewRoutes = addRoutes(menus);
  }

  // 设置页面标题
  let title = to.meta.title || "-商城后台-";
  document.title = title;

  // 如果有新的路由那么走新的路由 解决新添加路由刷新404问题
  hasNewRoutes ? next(to.fullPath) : next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  hideFullLoading();
});
