<template>
  <div class="flex f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      统一系统VueApi测试
    </span>
    <el-icon class="icon-btn"><fold /></el-icon>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="刷新"
      placement="bottom"
    >
      <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef">
    123
    <div class="bg-rose-400" style="height: 1000px"></div>
  </form-drawer>


</template>
<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>

<script setup>
import { ref, reactive } from "vue";
import FormDrawer from '~/components/FormDrawer.vue'
import { logout, updatepassword } from "~/api/manager";
import { showModal, toast } from "~/composables/utils";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";

const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

const rules = {
  oldpassword: [
    {
      required: true,
      message: "旧密码不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "新密码不能为空",
      trigger: "blur",
    },
  ],
  repassword: [
    {
      required: true,
      message: "确认密码不能为空",
      trigger: "blur",
    },
  ],
};

const formRef = ref(null);
const loading = ref(false);
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }

    loading.value = true;
    updatepassword(form)
    .then(res => {
      toast('修改密码成功,请重新登录')
      store.dispatch("logout");
      // 跳转到登录页面
      router.push("/login");
    })
    .finally(() => {
      loading.value = false;
    })
  });
};

// 修改密码部分
const formDrawerRef = ref(null)
const showDrawer = ref(false);
const { isFullscreen, toggle } = useFullscreen();
const router = useRouter();
const store = useStore();

const handleCommand = (c) => {
  switch (c) {
    case "rePassword":
      formDrawerRef.value.open();
      break;
    case "logout":
      handleLogout();
      break;
    default:
      return;
  }
};

// 刷新
const handleRefresh = () => {
  location.reload();
};

// 退出
const handleLogout = () => {
  showModal("是否要退出登录").then((res) => {
    logout().finally(() => {
      store.dispatch("logout");
      // 跳转到登录页面
      router.push("/login");
      // 提示退出登录成功
      toast("退出登录成功");
    });
  });
};
</script>
