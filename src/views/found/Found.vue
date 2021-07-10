<template>
  <NavBar
    left-icon="arrow-left"
    left-text=""
    right-text=""
    right-icon=""
    title="搜索"
    @left-click="goBack"
  />
  <search search-text="请输入商家或美食名称" @search-click="getSearch" />
  <list-item :shops-list="shopsList" />
  <tab-bar />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TabBar from "com/TabBar/TabBar.vue";
import NavBar from "com/NavBar/NavBar.vue";
import search from "../components/search.vue";
import listItem from "com/list-item/List-item.vue";
import { useRouter } from "vue-router";
import { getSearchRestuarant } from "../../api/getShopping";
import ListItem from "../../components/list-item/List-item.vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    let shopsList = ref("");
    const getSearch = async (actx: any, geohash: string, keyword: string) => {
      shopsList.value = await getSearchRestuarant(actx, geohash, keyword);
      console.log(shopsList.value);
    };
    return {
      goBack,
      getSearch,
      shopsList,
    };
  },
  components: {
    TabBar,
    NavBar,
    search,
    listItem,
    ListItem,
  },
});
</script>

<style scoped lang="scss"></style>
