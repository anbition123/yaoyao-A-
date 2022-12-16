import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login/login.vue";
import Layout from "../views/Layout/index.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/Layout",
      name: "Layout",
      component: Layout,
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/error/404.vue"),
      visible: false,
    },
    {
      path: "*",
      redirect: "/404",
      visible: false,
    },
  ],
});
