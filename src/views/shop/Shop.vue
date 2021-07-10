<template>
  <header class="flex">
    <van-image
      width="5rem"
      height="5rem"
      round
      fit="contain"
      :src="'//elm.cangdu.org/img/' + resInfo.image_path"
    />
    <div>
      <h5>{{ resInfo.name }}</h5>
      <p>公告：{{ resInfo.promotion_info }}</p>
    </div>
    <van-icon name="arrow" />
  </header>
  <van-tabs @click="onClick">
    <van-tab title="商家">
      <template #default>
        <select-item></select-item>
      </template>
    </van-tab>
    <van-tab title="评价">内容 2</van-tab>
  </van-tabs>
</template>
<script lang="ts">
import { Toast } from "vant";
import SelectItem from "./components/select.vue";
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { getRestaurantInfo } from "../../api/getShopping";
export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const route = useRoute();
    const resInfo = ref("");
    const onClick = (name: any, title: string) => Toast(title);
    const getResInfo = async () => {
      resInfo.value = await getRestaurantInfo(actx, route.query.id);
    };
    onBeforeMount(() => {
      getResInfo();
    });
    return {
      resInfo,
      onClick,
    };
  },
  components: {
    SelectItem,
  },
  props: {},
});
</script>
<style lang="scss" scoped>
.flex {
  padding: 1rem;
  color: #fff;
  background: linear-gradient(to right, skyblue, rgb(132, 0, 255));
  .van-image {
    margin-right: 1rem;
  }
  p {
    width: 15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.van-tabs {
  .van-tree-select {
    height: 100%;
  }
}
</style>
