import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "accessible-nprogress";

const layout = () => import("../layout/index.vue");
const login = () => import("../views/login/Login.vue");
const city = () => import("@/views/city/city.vue");
const city_item = () => import("../views/city/city-item/index.vue");
const found = () => import("../views/found/Found.vue");
const orders = () => import("../views/orders/Orders.vue");
const mine = () => import("../views/mine/Mine.vue");
const food = () => import("../views/food/Food.vue");
const shop = () => import("../views/shop/Shop.vue");
const pay=()=>import('../views/pay/pay.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: layout,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/city",
    component: city,
  },
  {
    path: "/city/:id",
    component: city_item,
  },
  {
    path: "/found",
    component: found,
  },
  {
    path: "/orders",
    component: orders,
  },
  {
    path: "/mine",
    component: mine,
  },
  {
    path: "/food",
    component: food,
  },
  {
    path: "/shop/:id",
    component: shop,
  },
  {
    path:'/pay',
    component:pay
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  if (!localStorage.getItem("user_id")) {
    return next("/login");
  }
  NProgress.start();
  next();
});
router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
