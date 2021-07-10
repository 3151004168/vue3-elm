<template>
  <nav-bar
    left-icon="arrow-left"
    left-text=""
    right-text=""
    right-icon=""
    title="订单列表"
  />
  <van-list>
    <van-cell v-for="item in ordersList" :key="item.id">
      <template #value>
        <div class="list-item">
          <van-image
            style="align-self: center; margin-right: 10px"
            round
            width="50"
            height="50"
            :src="'//elm.cangdu.org/img/' + item.restaurant_image_url"
          />
          <ul>
            <li>
              <div class="left">
                <span>
                  {{ item.restaurant_name }}
                </span>
                <span>
                  {{ item.formatted_created_at }}
                </span>
              </div>
              {{ item.status_bar.title }}
            </li>
            <li>
              <span> {{ item.basket.group[0][0].name }} </span
              ><span> {{ "￥" + item.total_amount }}</span>
            </li>
            <li class="more">
              <van-tag plain type="primary">再来一单</van-tag>
            </li>
          </ul>
        </div>
      </template>
    </van-cell>
  </van-list>
  <tab-bar />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeMount, ref } from "vue";
import tabBar from "com/TabBar/TabBar.vue";
import NavBar from "com/NavBar/NavBar.vue";
import { getOrders } from "../../api/getShopping";

export default defineComponent({
  setup() {
    const { appContext }: any = getCurrentInstance();
    const actx = appContext.config.globalProperties;
    let ordersList = ref("");
    const getOrdersList = async () => {
      const id = localStorage.getItem("user_id");
      ordersList.value = await getOrders(actx, id);
      console.log(ordersList.value);
    };
    onBeforeMount(() => {
      getOrdersList();
    });
    return {
      ordersList,
    };
  },
  components: {
    tabBar,
    NavBar,
  },
});
</script>
<style lang="scss" scoped>
.van-cell {
  .list-item {
    display: flex;
    ul {
      width: 80%;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(224, 224, 224);
        padding: 10px 0;
        .left {
          display: flex;
          flex-direction: column;
        }
      }
      .more{
        justify-content:flex-end;
        border: none;
      }
    }
  }
}
</style>
