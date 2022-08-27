<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <f-menu></f-menu>
      </el-aside>
      <el-main>
        <f-tag-list></f-tag-list>
        <!-- 主要内容 -->
        <router-view v-slot="{ Component }">
          <!-- 添加动画效果 transition要求子组件包裹只有一个根元素 如果有两个根元素动画会失效 -->
          <transition name="fade">
            <!-- keep-alive缓存组件 -->
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>

<style scoped>
.el-aside {
  transition: all 0.2s;
}

/* 动画效果进入前是透明度0，进入后透明度为1 */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
/* 离开之前 透明度是1 离开之后透明度改为0 */
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
/* 进入和离开动画时长 */
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
/* 优化 先离开在进入 设置进入动画延迟一下 */
.fade-enter-active {
  transition-delay: .3s;
}
</style>
