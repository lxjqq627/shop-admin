import { createRouter, createWebHashHistory } from "vue-router";

import Admin from "~/layouts/admin.vue";
import Index from "~/pages/index.vue";
import Login from "~/pages/login.vue";
import NotFound from "~/pages/404.vue";
import GoodsList from "~/pages/goods/list.vue";
import CategoryList from "~/pages/category/list.vue";

// 默认路由 所有用户共享
const routes = [
  {
    path: "/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/login",
    name:'/login',
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// 动态路由的数组, 用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: Index,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodsList,
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
      title: "分类列表",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRouteByMenus = (arr) => {
    arr.forEach((e) => {
      let item = asyncRoutes.find((o) => o.path === e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        // 如果用了addRoute 那么只注册了一个新路由 
        // 也就是说新添加的路由与当前路由位置相匹配 就需要我们用router.push或者router.replace来手动导航才能显示新路由
        router.addRoute("admin", item);
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        findAndAddRouteByMenus(e.child);
      }
    });
  };
  findAndAddRouteByMenus(menus);
  return hasNewRoutes;
}
