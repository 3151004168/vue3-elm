<template>
  <van-nav-bar
      safe-area-inset-top
      @click-right="$emit('right-click')"
      @click-left="$emit('left-click')"
      fixed
      placeholder
  >
    <template #left>
      <van-icon :name="leftIcon"/>
      <span style="color: #2F9AFB">{{ leftText }}</span>
    </template>
    <template #title>
      <span @click="$emit('title-click')">{{ title }}</span>
    </template>
    <template #right>
      <van-icon :name="rightIcon"/>
      <span style="color: #2F9AFB">{{ rightText }}</span>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup(props) {
    const router =useRouter()

    function goBack() {
      console.log(1)
      router.push('/layout')
    }

    return {
      goBack
    }
  },
  emits: ['left-click', 'right-click', 'title-click'],
  props: {
    title: {
      type: String,
      default: '密码登录'
    },
    leftIcon: {
      type: String,
      default: 'arrow-left'
    },
    leftText: {
      type: String,
      default: '返回'
    },
    rightIcon: {
      type: String,
      default: 'ellipsis'
    },
    rightText: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.van-nav-bar {
  width: inherit;

  .van-icon {
    font-size: 1.5rem;
  }

}

</style>
