<template>
  <NavBar
    left-icon="arrow-left"
    left-text=""
    right-text=""
    right-icon=""
    :title="title"
    @left-click="goBack"
  />
  <van-dropdown-menu active-color="#1989fa" duration="0.3">
    <van-dropdown-item v-model="state.value1" title="分类" ref="item1">
      <van-tree-select
        v-model:active-id="state.activeId"
        v-model:main-active-index="state.activeIndex"
        :items="items"
        @click-item="getShopCategory"
      />
    </van-dropdown-item>
    <van-dropdown-item
      v-model="state.value2"
      title="排序"
      ref="item3"
      :options="option2"
    />
    <van-dropdown-item v-model="state.value3" title="筛选" ref="item2">
      <h5>配送方式</h5>
      <van-checkbox-group v-model="checked">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="item"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox
                :name="item"
                :ref="(el) => (checkboxRefs[index] = el)"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
        <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-checkbox-group>
    </van-dropdown-item>
  </van-dropdown-menu>
  <list-item :shops-list="dinerInfo"></list-item>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUpdate,
  reactive,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "com/NavBar/NavBar.vue";
import { getDinersList, getShopList } from "../../api/getShopping";
import listItem from "com/list-item/List-item.vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const title = ref(route.query.title);
    const goBack = () => {
      router.go(-1);
    };
    const state = reactive({
      value1: 0,
      value2: "a",
      value3: "b",
      activeId: 1,
      activeIndex: 0,
    });
    const items: any = [];
    const item1 = ref(null);
    const item2 = ref(null);
    const item3 = ref(null);
    const option2 = [
      { text: "只能排序", value: "a" },
      { text: "距离最近", value: "b" },
      { text: "销量最高", value: "c" },
      { text: "起送价最低", value: "d" },
      { text: "配送速度最快", value: "e" },
      { text: "评分最高", value: "f" },
    ];
    const getShopCategory = (data: any) => {
      console.log(data);
      title.value = data.text;
      item1.value.toggle();
    };
    const getShopsList = async () => {
      const data = await getShopList(actx);
      //   console.log(data);
      data.forEach((e: any) => {
        const obj: any = {
          text: "",
          children: [],
        };
        obj.text = e.name;
        // 遍历children数组
        e.sub_categories.forEach((children: any) => {
          const cObj = { text: "", id: "" };
          cObj.text = children.name;
          cObj.id = children.id;
          obj.children.push(cObj);
        });
        items.push(obj);
      });
    };
    const checked = ref([]);
    const checkboxRefs = ref([]);
    const toggle = (index: number) => {
      checkboxRefs.value[index].toggle();
    };
    const onConfirm = () => {
      item2.value.toggle();
      console.log(checked.value);
    };
    const list = [
      "蜂鸟专送",
      "品牌商家",
      "外卖保",
      "准时达",
      "新店",
      "在线支付",
      "开发票",
    ];
    const dinerInfo = ref("");
    const dinersList = async () => {
      dinerInfo.value = await getDinersList(
        actx,
        store.state.homeTitleInfo.latitude,
        store.state.homeTitleInfo.longitude
      );
      // console.log(dinerInfo.value)
    };
    onBeforeUpdate(() => {
      checkboxRefs.value = [];
    });
    onBeforeMount(() => {
      getShopsList();
      dinersList();
    });
    return {
      goBack,
      title,
      state,
      items,
      item1,
      item3,
      option2,
      list,
      toggle,
      checked,
      checkboxRefs,
      onConfirm,
      item2,
      dinerInfo,
      getShopCategory,
    };
  },
  components: {
    NavBar,
    listItem,
  },
  props: {},
});
</script>
<style lang="scss" scoped></style>
