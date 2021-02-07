import Vue from "vue";
import VueRouter from "vue-router";
import routeMap from "@/router/routes";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: routeMap["Home"]
  },
  // 登录页
  {
    path: "/Login",
    name: "Login",
    component: routeMap["Login"]
  },
  // 解绑页
  {
    path: "/Untie",
    name: "Untie",
    component: routeMap["Untie"]
  },
  // 操作页面
  {
    path: "/Operation",
    name: "Operation",
    component: routeMap["Operation"]
  },
  // 修改页面
  {
    path: "/UpdateInformation",
    name: "UpdateInformation",
    component: routeMap["UpdateInformation"]
  },
  // 操作第一步
  {
    path: "/StepOne",
    name: "StepOne",
    component: routeMap["StepOne"]
  },
  // 操作第二步
  {
    path: "/StepTwo",
    name: "StepTwo",
    component: routeMap["StepTwo"]
  },
  // 操作第三步
  {
    path: "/StepThree",
    name: "StepThree",
    component: routeMap["StepThree"]
  },
  // 操作第四步
  {
    path: "/StepFour",
    name: "StepFour",
    component: routeMap["StepFour"]
  },
  // 操作第五步
  {
    path: "/StepFive",
    name: "StepFive",
    component: routeMap["StepFive"]
  },
  // 操作第六步
  {
    path: "/StepSix",
    name: "StepSix",
    component: routeMap["StepSix"]
  },
  
  // 404
  {
    path: "/404",
    component: routeMap["404"]
  },
  {
    path: "*",
    redirect: "/404"
  }
  // 404
];

const router = new VueRouter({
  routes
});

export default router;
