<template>
  <form action="/">
    <van-search
      v-model="keyword"
      show-action
      shape="round"
      background="#2F9AFB"
      :placeholder="searchText"
      @cancel="onCancel"
    >
      <template #action>
        <div @click="onSearch" style="color: #fff">搜索</div>
      </template>
    </van-search>
  </form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const router = useRouter();
    const keyword = ref("");
    const goBack = () => {
      router.go(-1);
    };
    const onCancel = () => Toast("搜索");
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    const onSearch = async () => {
      const geohash: string =
        store.state.homeTitleInfo.latitude +
        "," +
        store.state.homeTitleInfo.longitude;
      state.loading = true;
      emit("search-click", actx, geohash, keyword.value);
      store.commit("SEARCH_RESTAURANT", keyword.value);
    };
    return {
      onCancel,
      onSearch,
      goBack,
      keyword,
    };
  },
  emits: ["search-click"],
  props: {
    searchText: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped></style>
