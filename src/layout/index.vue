<template>
  <div>
    <NavBar
      left-icon="search"
      left-text=""
      :right-text="user_id ? '' : '登录|注册'"
      :right-icon="user_id ? 'contact' : ''"
      :title="name"
      @right-click="user_id ? getMine() : getLogin()"
      @title-click="goCity"
    />
    <shops-list />
    <list-item :shops-list="dinerInfo"></list-item>
    <tab-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import NavBar from "../components/NavBar/NavBar.vue";
import TabBar from "../components/TabBar/TabBar.vue";
import { useRoute, useRouter } from "vue-router";
import { getDinersList } from "../api/getShopping";
import listItem from "com/list-item/List-item.vue";
import { useStore, mapState } from "vuex";
import shopsList from "./components/shopslist.vue";

export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const getLogin = () => {
      router.push("/login");
    };
    const getMine = () => {
      router.push("/mine");
    };
    const user_id = () => {
      return sessionStorage.getItem("user_id");
    };
    const goCity = () => {
      router.push("/city");
    };
    const dinerInfo = ref("");
    const dinersList = async () => {
      dinerInfo.value = await getDinersList(
        actx,
        store.state.homeTitleInfo.latitude,
        store.state.homeTitleInfo.longitude
      );
      // console.log(dinerInfo.value)
    };
    const getDiner = (id: number) => {
      console.log(id);
    };
    onBeforeMount(() => {
      dinersList();
    });
    return {
      getLogin,
      user_id,
      getMine,
      route,
      goCity,
      dinerInfo,
      getDiner,
    };
  },
  components: {
    NavBar,
    TabBar,
    listItem,
    shopsList,
  },
  computed: mapState({ name: (state) => state.homeTitleInfo.name }),
});
</script>

<style lang="scss" scoped></style>
