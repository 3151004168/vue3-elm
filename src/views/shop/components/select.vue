<template>
  <div class="container">
    <ul class="list">
      <li
        class="flex"
        v-for="(item, index) in shopList"
        :key="item.id"
        @click="getShopList(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="item">
      <li v-for="item in children[index]" :key="item.id" class="flex list-item">
        <van-image
          width="3rem"
          height="3rem"
          round
          :src="'//elm.cangdu.org/img/' + item.image_path"
        />
        <div class="text">
          <h5>{{ item.name }}</h5>
          <p class="c9">{{ item.description }}</p>
          <p>{{ item.tips }}</p>
          <van-tag
            plain
            v-if="item.activity"
            type="primary"
            :color="'#' + item.activity.icon_color"
            :text-color="'#' + item.activity.image_text_color"
            >{{ item.activity.image_text }}</van-tag
          >
          <p class="flex">
            <span style="color: #f1884f"
              >{{ "￥" + item.specfoods[0].price }}
            </span>
            <span>
              <van-button
                size="mini"
                icon="minus"
                type="primary"
                round
                @click="decrease(item)"
              />
              {{ item.is_featured }}
              <van-button
                icon="plus"
                type="primary"
                round
                size="mini"
                @click="
                  increase(item.specfoods[0].price, item, item.is_featured)
                "
              />
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
  <shop-item
    :total-price="totalPrice"
    :goods="goodsInfo"
    @increase="increase"
    @decrease="decrease"
  />
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getShopCategory } from "../../../api/getShopping";
import shopItem from "./shop-item.vue";
export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    const store = useStore();
    const route = useRoute();
    const shopList = ref([]);
    const children = ref([]);
    const index = ref(0);
    const getShopList = (i: number) => {
      console.log(i);
      index.value = i;
    };
    const getResInfo = async () => {
      const data = await getShopCategory(actx, route.query.id);
      shopList.value = data.category_list.splice(0, 9);
      shopList.value.forEach((e: any) => {
        children.value.push(e.foods);
      });
      console.log(children);
    };
    const goodsInfo: object[] = reactive([]);
    const totalPrice = ref(0);
    const increase = (p: number, goods: any, count: number) => {
      console.log(goods);

      totalPrice.value += p;
      if (count < 1) {
        goodsInfo.push(goods);
      }
      goodsInfo.forEach((e: any, i: number) => {
        if (e.item_id === goods.item_id) {
          goodsInfo[i].is_featured++;
        }
      });
      console.log(goodsInfo);
    };
    const decrease = (goods: any) => {
      goodsInfo.forEach((e: any, i: number) => {
        const boo: boolean = e.item_id === goods.item_id;
        if (boo) {
          if (e.is_featured > 1) {
            goodsInfo[i].is_featured--;
            totalPrice.value -= goodsInfo[i].specfoods[0].price;
          } else {
            goodsInfo[i].is_featured--;
            totalPrice.value -= goodsInfo[i].specfoods[0].price;
            goodsInfo.splice(i, 1);
          }
        }
      });
    };
    onBeforeMount(() => {
      getResInfo();
    });
    return {
      shopList,
      getShopList,
      children,
      increase,
      index,
      totalPrice,
      goodsInfo,
      decrease,
    };
  },
  components: {
    shopItem,
  },
  props: {},
});
</script>
<style lang="scss" scoped>
.container {
  //   height: 90vh;
  .list-item {
    justify-content: flex-start;
    padding: 1rem;
    .van-image {
      margin-right: 1rem;
    }
    .text {
      width: 80%;
    }
  }
  ul {
    height: 70vh;
    overflow-y: auto;
  }
  .item {
    width: 75%;
  }
  .list {
    display: flex;
    flex-direction: column;
    width: 25%;
    li {
      box-sizing: border-box;
      padding: 0 0 0 10px;
      width: 100%;
      height: 6rem;
      border: 1px solid skyblue;
      &:hover {
        background: linear-gradient(
          to right,
          rgb(0, 204, 255),
          rgb(152, 245, 198)
        );
        border-right: 0;
        border-left: 2px solid rgb(0, 119, 255);
        font-weight: 550;
      }
    }
  }
}
</style>
