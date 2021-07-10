<template>
  <h4>
    <i :class="'iconfont' + ' ' + iconName"></i>
    {{ title }}
  </h4>
  <van-list finished-text="没有更多了">
    <van-cell
      v-for="item in shopsList"
      :key="item.id"
      @click="getDiner(item.id)"
    >
      <template #value>
        <div class="list-item">
          <van-image
            width="50"
            height="50"
            :src="'//elm.cangdu.org/img/' + item.image_path"
          />
          <div class="list-item-text">
            <div>
              <span>{{ item.name }}</span>
              <span>保准票</span>
            </div>
            <div>
              <span>
                <van-rate
                  v-model="item.rating"
                  readonly
                  allow-half
                  size=".5rem"
                  color="#ffd21e"
                />
                <span>月售{{ item.recent_order_num }}单</span>
              </span>
              <span>
                <van-tag type="primary">{{ item.delivery_mode.text }}</van-tag>
                <van-tag plain type="primary">{{
                  item.supports[1].name
                }}</van-tag>
              </span>
            </div>
            <div>
              <span>{{ item.piecewise_agent_fee.tips }}</span>
              <span style="color: #999999"
                >{{ item.distance }} /
                <a href="" style="color: #2f9afb">{{
                  item.order_lead_time
                }}</a></span
              >
            </div>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props) {
    const router = useRouter();
    const getDiner = (id: number) => {
      console.log(id);
      router.push({ path: `/shop/${id}`, query: { id: id } });
    };
    return {
      getDiner,
      onload,
    };
  },
  props: {
    iconName: {
      type: String,
      default: "",
    },
    shopsList: {
      type: [Array, Object, String],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss">
.van-cell {
  padding-right: 0;

  .list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .van-image {
      margin-right: 10px;
    }
    .list-item-text {
      width: calc(100% - 60px);
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;

      .van-rate {
        margin-right: 1rem;
      }

      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
