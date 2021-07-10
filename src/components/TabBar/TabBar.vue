<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      v-for="item in tabList"
      :key="item.name"
      :to="`/${item.name}`"
      :name="item.name"
      :icon="item.icon"
    >
      {{ item.text }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const active = ref("layout");
    const tabList = [
      {
        text: "首页",
        name: "layout",
        icon: "wap-home-o",
      },
      {
        text: "发现",
        name: "found",
        icon: "search",
      },
      {
        text: "订单",
        name: "orders",
        icon: "description",
      },
      {
        text: "我的",
        name: "mine",
        icon: "user-circle-o",
      },
    ];
    return {
      active,
      tabList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
