<template>
  <nav-bar
    title="确认订单"
    :right-icon="user_id ? 'contact' : ''"
    @left-click="goBack"
  />
  <van-contact-card
    type="edit"
    :name="currentContact.name"
    :tel="currentContact.tel"
    @click="onEdit"
  />
  <van-cell title="支付方式" is-link value="在线支付" />
  <!-- 优惠券单元格 -->
  <van-coupon-cell
    :coupons="state.coupons"
    :chosen-coupon="state.chosenCoupon"
    @click="isShowPopup"
  />
  <!-- 优惠券列表 -->
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    :style="{ height: '70%' }"
  >
    <van-coupon-list
      :coupons="state.coupons"
      :chosen-coupon="state.chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
    />
  </van-popup>

  <van-card
    num="2"
    tag="标签"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    origin-price="10.00"
  />
  <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
    <!-- <template #tip>
      你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
    </template> -->
  </van-submit-bar>
</template>
<script lang="ts">
import NavBar from "com/NavBar/NavBar.vue";
import { Toast } from "vant";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const user_id = () => {
      return sessionStorage.getItem("user_id");
    };
    const goBack = () => {
      router.go(-1);
    };
    const currentContact = reactive({
      name: "张三",
      tel: "13000000000",
    });
    const onEdit = () => Toast("edit");
    const coupon = {
      available: 1,
      condition: "无使用门槛\n最多优惠12元",
      reason: "",
      value: 150,
      name: "优惠券名称",
      startAt: 1489104000,
      endAt: 1514592000,
      valueDesc: "1.5",
      unitDesc: "元",
    };
    const state = reactive({
      coupons: [coupon],
      chosenCoupon: 1,
    });
    const show = ref(false);
    const isShowPopup = () => {
      show.value = true;
    };
    const onChange = (index: number) => {
      show.value = false;
      state.chosenCoupon = index;
    };
    const onExchange = (code: any) => {
      state.coupons.push(coupon);
    };
    const onSubmit = () => Toast("点击按钮");
    const onClickLink = () => Toast("修改地址");
    const checked = ref();
    return {
      user_id,
      goBack,
      onEdit,
      currentContact,
      state,
      onChange,
      onExchange,
      isShowPopup,
      show,
      disabledCoupons: [coupon],
      onSubmit,
      onClickLink,
      checked,
    };
  },
  components: {
    NavBar,
  },
  props: {},
});
</script>
<style lang="scss" scoped></style>
