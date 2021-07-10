<template>
  <div class="item">
    <NavBar
        :title="route.query.name "
        right-text="切换城市"
        right-icon=""
        left-icon="arrow-left"
        left-text=""
        @left-click="goBack"
    />
    <form action="/">
      <van-search
          v-model="keyword"
          show-action
          shape="round"
          background="#2F9AFB"
          placeholder="输入学校、商务楼、地址"
          @cancel="onCancel"
      >
        <template #action>
          <div @click="onSearch" style="color:#fff;">搜索</div>
        </template>
      </van-search>
    </form>
    <div class="search-history">
      <h4 v-if="state.searchClick">搜索历史</h4>
      <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="没有更多了"
          @load="load"
      >
        <van-cell v-for="item in state.list" :key="item.name" @click="getHome(item)">
          <template #value>
            <p>{{ item.name }}</p>
            <p style="color: #999">{{ item.address }}</p>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, getCurrentInstance, onBeforeMount} from "vue";
import NavBar from "../../../components/NavBar/NavBar.vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import {getAddress} from "../../../api/getCity";
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const {appContext}: any = getCurrentInstance()
    const actx = appContext.config.globalProperties
    const route =  useRoute()
    const router =  useRouter()
    const store = useStore()

    function goBack() {
      router.go(-1)
    }

    let address = ref('')
    const keyword = ref('');
    const onCancel = () => Toast('搜索')

    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      searchClick: true
    });
    const load = () => {
      state.loading = false
    }

    function onload() {
      state.list = store.state.searchHistory
    }

    const onSearch = async () => {
      state.loading = true
      state.searchClick = false
      getAddress(actx, route.params.id, keyword.value).then((res) => {
        state.list = res
        state.loading = false
      })
    };
    const getHome = (item: object) => {
      // console.log(item)
      router.push({path: '/layout'})
      store.commit('HOME_NAV_INFO', item)
      store.commit('SEARCH_HISTORY', item)
    }
    onBeforeMount(() => {
      onload()
    })
    return {
      route,
      goBack,
      keyword,
      onSearch,
      address,
      onCancel,
      state,
      getHome,
      load
    }
  },
  components: {
    NavBar
  }
})
</script>

<style scoped lang="scss">

</style>
