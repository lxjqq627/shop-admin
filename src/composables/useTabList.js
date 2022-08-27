import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { router } from "~/router";

export function useTabList() {
  const route = useRoute();
  const cookie = useCookies();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);

  // 添加标签导航的方法
  function addTab(tab) {
    let noTab = tabList.value.findIndex((t) => t.path === tab.path) === -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }

  // 初始化导航标签列表
  function initTabList() {
    let tbs = cookie.get("tabList");
    if (tbs) {
      tabList.value = tbs;
    }
  }
  initTabList();

  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path; // 每次进入页面的时候焦点状态切换至对应页面
    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });

  const changeTag = (t) => {
    console.log(t);
    activeTab.value = t; // 当前激活状态切换至相应页面
    router.push(t);
  };

  const removeTab = (t) => {
    let tabs = tabList.value;
    let a = activeTab.value; // 拿到当前激活的值
    if (a === t) {
      // 当前关闭的是激活的这个
      tabs.forEach((tab, index) => {
        // 拿到下一个或者上一个路由
        if (tab.path === t) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path; // 拿到当前激活的的值
          }
        }
      });
    }

    activeTab.value = a; // 下一个跳转的路径给激活的值 赋值给他之后 自动触发transTag事件 自动进行跳转
    tabList.value = tabList.value.filter((tab) => tab.path !== t); // 只有当前不等于当前关闭的这个才能被留下来

    cookie.set("tabList", tabList.value); // 更新存储
  };

  const handleClose = (c) => {
    if (c === "clearAll") {
      // 切换回首页
      activeTab.value = "/";
      // 过滤只剩下首页
      tabList.value = [
        {
          title: "后台首页",
          path: "/",
        },
      ];
    } else if (c === "clearOther") {
      // 过滤只剩下首页和当前激活
      tabList.value = tabList.value.filter(
        (tab) => tab.path === "/" || tab.path === activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
  };

  return {
    activeTab,
    tabList,
    changeTag,
    removeTab,
    handleClose,
  };
}
