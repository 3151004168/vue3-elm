<template>
  <!-- <van-cell is-link title="基础用法"  /> -->
  <div class="flex shop">
    <img src="@/assets/images/logo.jpg" alt="" @click="show = true" />
    <span>
      <p>{{ "￥" + totalPrice + ".00" }}</p>
      <span>配送费￥5</span>
    </span>
    <van-button plain hairline type="success" to="/pay">去结算</van-button>
  </div>
  <van-action-sheet v-model:show="show" title="购物车">
    <div class="content">
      <van-card
        v-for="(item, index) in goods"
        :key="item.name"
        :num="item.is_featured"
        :price="item.specfoods[0].price + '.00'"
        :desc="item.description"
        :title="item.name"
        :thumb="'//elm.cangdu.org/img/' + item.image_path"
      >
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button
            size="mini"
            icon="minus"
            type="primary"
            round
            @click="$emit('decrease', item)"
          />
          <van-button
            icon="plus"
            type="primary"
            round
            size="mini"
            @click="
              $emit('increase', item.specfoods[0].price, item, item.is_featured)
            "
          />
        </template>
      </van-card>
    </div>
  </van-action-sheet>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  setup(props) {
    const show = ref(false);
    return {
      show,
    };
  },
  emits: ["increase", "decrease"],
  props: {
    totalPrice: {
      type: [String, Number],
      default: 0,
    },
    goods: {
      type: [Array, Object, String],
      default: "",
    },
  },
});
</script>
<style lang="scss" scoped>
.shop {
  img {
    width: 4rem;
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
  background: linear-gradient(to right, skyblue, pink);
}
</style>
