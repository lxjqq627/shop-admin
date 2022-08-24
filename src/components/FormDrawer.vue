<template>
  <!-- 抽屉组件 -->
  <el-drawer
    size="45%"
    v-model="showDrawer"
    title="修改密码"
    :close-on-click-modal="false"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button color="#626aef" type="primary">提交</el-button>
        <el-button color="#626aef" type="default" @click="close">取消</el-button>
      </div>
      <!-- <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        label-width="80px"
        size="small"
      >
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
            type="password"
            v-model="form.repassword"
            placeholder="请输入确认密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            color="#626aef"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >提交</el-button
          >
        </el-form-item>
      </el-form> -->
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref(false);

const open = () => {
  showDrawer.value = true;
};

const close = () => {
  showDrawer.value = false;
};

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
});
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
