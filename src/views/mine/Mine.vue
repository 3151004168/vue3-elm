<template>
  <nav-bar
    title="我的"
    left-icon="arrow-left"
    left-text=""
    right-text=""
    right-icon=""
  />
  <div class="avatar">
    <van-image
      round
      width="5rem"
      height="5rem"
      :src="'http://elm.cangdu.org/img/' + userInfo.avatar"
    />
    <div class="text">
      <p>{{ userInfo.username }}</p>
      <p>
        <van-icon name="phone-o" />{{
          userInfo.mobile ? userInfo.mobile : "暂无绑定的手机号"
        }}
      </p>
    </div>
    <van-icon name="arrow" />
  </div>
  <van-grid :column-num="3">
    <van-grid-item>
      <p style="color: #f90; font-size: 1.6rem">
        {{ userInfo.balance + ".00元" }}
      </p>
      <p>我的余额</p>
    </van-grid-item>
    <van-grid-item>
      <p style="color: rgb(255, 36, 36); font-size: 1.6rem">
        {{ userInfo.gift_amount + "个" }}
      </p>
      <p>我的优惠</p>
    </van-grid-item>
    <van-grid-item>
      <p style="color: rgb(0, 255, 0); font-size: 1.6rem">
        {{ userInfo.__v + "分" }}
      </p>
      <p>积分</p>
    </van-grid-item>
  </van-grid>
  <van-list>
    <van-cell>
      <template #value>
        <div class="list-item">
          <span>
            <van-icon name="balance-list-o" />
            我的订单
          </span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #value>
        <div class="list-item">
          <span>
            <i class="iconfont icon-212" style="color:red"></i>
            积分商城
          </span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #value>
        <div class="list-item">
          <span>
           <i class="iconfont icon-huiyuan" style="color:yellow"></i>
            饿了么会员卡
          </span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #value>
        <div class="list-item">
          <span>
           <i class="iconfont icon-fuwuzhongxin" style="color:pink"></i>
            服务中心
          </span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #value>
        <div class="list-item">
          <span>
           <i class="iconfont icon-elment" style="color:#1989fa"></i>
            下载饿了么APP
          </span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-cell>
  </van-list>
  <tab-bar />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tabBar from "com/TabBar/TabBar.vue";
import NavBar from "com/NavBar/NavBar.vue";
import { mapState } from "vuex";
export default defineComponent({
  setup() {
    const userInfo = () => {};
    return {};
  },
  components: {
    tabBar,
    NavBar,
  },
  computed: mapState({
    userInfo: (state) => state.userInfo,
  }),
});
</script>

<style lang="scss" scoped>
.avatar {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  background: linear-gradient(to right, rgb(0, 140, 255), pink);
  .text {
    width: 70%;
  }
}
.list-item{
  display: flex;
  justify-content: space-between;
}
</style>
