<template>
  <div class="city">
    <NavBar
      title=""
      right-text="登录|注册"
      right-icon=""
      left-icon=""
      left-text="ele.me"
      @right-click="getLogin"
      @left-click="flush"
    />
    <div class="container">
      <div class="location">
        <p>
          <span>当前定位城市：</span><span>定位不准时请在城市列表中选择</span>
        </p>
        <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          mode="link"
          v-if="guess.name"
          :key="guess.id"
          @click="getCityId(guess.id, guess.name)"
          :text="guess.name"
        ></van-notice-bar>
      </div>
      <div class="hot-city">
        <h4>热门城市</h4>
        <van-grid clickable>
          <van-grid-item
            v-for="item in hot_city"
            :key="item.id"
            :text="item.name"
            @click="getCityId(item.id, item.name)"
          />
        </van-grid>
      </div>
      <div class="city-category">
        <div v-for="(item, index) in group_city" :key="item.id">
          <h4>
            {{ letter[index].key }} {{ index === 0 ? "   (按首字母排序)" : "" }}
          </h4>
          <van-grid :column-num="4">
            <van-grid-item
              v-for="city in item"
              @click="getCityId(city.id, city.name)"
              :key="city.id"
              :text="city.name"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUpdated,
  ref,
} from "vue";
import NavBar from "../../components/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
import { getCity } from "../../api/getCity";
import { Toast } from "vant";

export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const router = new useRouter();
    const getLogin = () => {
      router.push("/login");
    };
    const flush = () => {
      window.location.reload();
    };
    const guess: any = ref("");
    const location = async () => {
      guess.value = await getCity(actx, "guess");
      // console.log(guess.value)
    };
    let hot_city = ref(null);
    const hotCity = async () => {
      hot_city.value = await getCity(actx, "hot");
      // console.log(hot_city.value)
    };
    const group_city: any = ref([]);
    const letter: any = ref([]);
    const groupCity = () => {
      getCity(actx, "group").then((res) => {
        for (let i = 65; i <= 90; i++) {
          const code = String.fromCharCode(i);
          letter.value.push({ key: code });
          group_city.value.push(res[code]);
        }
      });
    };

    const getCityId = (id: number, name: string) => {
      // console.log(i)
      router.push({
        path: `/city/${id}`,
        query: {
          name: name,
        },
      });
    };
    onBeforeMount(() => {
      hotCity();
      groupCity();
      location();
    });
    return {
      getLogin,
      flush,
      hot_city,
      group_city,
      letter,
      guess,
      getCityId,
    };
  },
  components: {
    NavBar,
  },
});
</script>

<style scoped lang="scss">
.city {
  //height: 100%;
  .container {
    flex-wrap: wrap;
    flex-direction: column;

    .location {
      width: inherit;

      p {
        height: 3rem;
        line-height: 4rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
      }
    }

    .hot-city {
      width: 100%;

      h4 {
        line-height: 2rem;
        height: 2rem;
        border-top: 1px solid #f4f5f7;
      }

      ::v-deep .van-grid-item {
        span {
          color: #2f9afb;
          font-size: 1.2rem;
        }
      }
    }

    .city-category {
      h4 {
        margin: 10px 0 10px 20px;
      }

      ::v-deep .van-grid-item {
        span {
          width: inherit;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
