<template>
  <van-swipe class="my-swipe" indicator-color="#2F9AFB">
    <van-swipe-item>
      <van-grid :column-num="4" clickable :border="false">
        <van-grid-item
          v-for="item in foodCategory.foodList1"
          :key="item.id"
          @click="getDiner(item.title)"
        >
          <template #default>
            <van-image :src="'//fuss10.elemecdn.com' + item.image_url" />
            <span>{{ item.title }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-swipe-item>
    <van-swipe-item>
      <van-grid :column-num="4" clickable :border="false">
        <van-grid-item
          v-for="item in foodCategory.foodList2"
          :key="item.id"
          @click="getDiner(item.title)"
        >
          <template #default>
            <van-image :src="'//fuss10.elemecdn.com' + item.image_url" />
            <span>{{ item.title }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { getFoodList } from "../../api/getShopping";

export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const router = useRouter();
    const foodCategory = reactive({
      foodList1: "",
      foodList2: "",
    });
    const foodList = async () => {
      const data = await getFoodList(actx);
      foodCategory.foodList1 = data.splice(0, 8);
      foodCategory.foodList2 = data;
    };
    const getDiner = (name: string) => {
      console.log(name);
      router.push({
        path: "/food",
        query: {
          title: name,
        },
      });
    };
    onBeforeMount(() => {
      foodList();
    });
    return {
      foodCategory,
      getDiner,
    };
  },
});
</script>

<style scoped lang="scss">
.van-grid {
  background-color: #f5f5f5;
}

.van-image {
  width: 3rem;
}

span {
  color: #999;
}
</style>
