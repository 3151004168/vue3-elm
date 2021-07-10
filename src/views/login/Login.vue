<template>
  <div class="login">
    <!--    导航栏-->
    <NavBar @left-click="push" @right-click="sayhi"/>
    <!--    -->
    <img class="logo" src="../../assets/images/logo.jpg" alt="">
    <!--    -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="state.username"
            colon
            autofocus
            name="username"
            label="用户名"
            placeholder="请填写用户名"
        />
        <van-field
            v-model="state.password"
            colon
            autofocus
            type="password"
            name="password"
            label="密码"
            placeholder="请填写密码"
        />
        <div class="verification">
          <van-field
              autofocus
              v-model="state.captcha_code"
              name="captcha_code"
              placeholder="请输入验证码"
          />
          <img style="width: 50px" :src="picCode" alt="">
          <div class="text" @click="getPicCodes">
            看不清
            <p style="color: #2F9AFB">换一张</p>
          </div>
        </div>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, getCurrentInstance, onBeforeMount, ref} from "vue";
import NavBar from '@/components/NavBar/Navbar.vue'
import {getPicCode, getLogin} from "../../api/getLogin";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {useStore} from 'vuex'

export default defineComponent({
  setup(props) {
    const {appContext, ctx}: any = getCurrentInstance()
    const actx = appContext.config.globalProperties
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      username: '',
      password: '',
      captcha_code: ''
    });
    const picCode = ref(null)
    const getPicCodes = async () => {
      const data = await getPicCode(actx)
      picCode.value = data.code
    }
    const onSubmit = async (values: object) => {
      console.log(values);
      const data = await getLogin(actx, '/v2/login', {
        username: state.username,
        password: state.password,
        captcha_code: state.captcha_code
      })
      console.log(data)
      if (data.message) {
        Toast.fail(data.message)
      } else {
        localStorage.setItem('user_id', data.user_id)
        store.commit('USER_INFO', data)
        push()
      }
    }
    const push = () => {
      router.push('/layout')
    }
    const sayhi = () => {
      console.log('婉仪吖')
    }
    onBeforeMount(() => {
      getPicCodes()
    })
    return {
      state,
      onSubmit,
      picCode,
      getPicCodes,
      push,
      sayhi
    };
  },
  components: {
    NavBar
  },
})
</script>

<style scoped lang="scss">
.login {
  text-align: center;

  .logo {
    margin: 1rem auto;
    width: 6rem;
    border: 1px solid #42a1b9;
    border-radius: 50%;
    box-shadow: 10px 5px 5px rgba($color: #000, $alpha: 0.1);
  }

  .verification {
    display: flex;
    justify-content: space-between;

    .van-field {
      width: 60%;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>
