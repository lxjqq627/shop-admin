<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot /></span>
    <!-- @click.stop 防止触发切换选中的冒泡事件 -->
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="small"
      @click.stop="$emit('edit')"
    >
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>

    <!-- 删除按钮会触发父级冒泡选择事件 此处.stop不生效 外层包一层span 在span上注册回调停止事件 -->
    <span @click.stop="() => {}">
      <el-popconfirm
      title="是否要删除该分类"
      confirmButtonText="确认"
      cancelButtonText="取消"
      confirmButtonType="primary"
      cancelButtonType="text"
      icon="el-icon-question"
      iconColor="#f90"
      hideIcon="false"
      @confirm="$emit('delete')"
    >
      <template #reference>
        <el-button text class="px-1" type="primary" size="small" @click="">
          <el-icon :size="12"><Close /></el-icon>
        </el-button>
      </template>
    </el-popconfirm>
    </span>

  </div>
</template>
<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "delete"]);
</script>
<style>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
