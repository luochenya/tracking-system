const routes = {
  // 首页
  Home: () =>
    import(
      /* webpackChunkName: "Home" */
      "@/views/Home.vue"
    ),
  // 登录页
  Login: () =>
    import(
      /* webpackChunkName: "Login" */
      "@/views/Login.vue"
    ),
  // 解绑页
  Untie: () =>
    import(
      /* webpackChunkName: "Untie" */
      "@/views/Untie.vue"
    ),
  // 操作页面
  Operation: () =>
    import(
      /* webpackChunkName: "Operation" */
      "@/views/Operation.vue"
    ),
  // 修改页面
  UpdateInformation: () =>
    import(
      /* webpackChunkName: "UpdateInformation" */
      "@/views/UpdateInformation.vue"
    ),
  // 操作第一步
  StepOne: () =>
    import(
      /* webpackChunkName: "StepOne" */
      "@/views/StepOne.vue"
    ),
  // 操作第二步
  StepTwo: () =>
    import(
      /* webpackChunkName: "StepTwo" */
      "@/views/StepTwo.vue"
    ),
  // 操作第三步
  StepThree: () =>
    import(
      /* webpackChunkName: "StepThree" */
      "@/views/StepThree.vue"
    ),
  // 操作第四步
  StepFour: () =>
    import(
      /* webpackChunkName: "StepFour" */
      "@/views/StepFour.vue"
    ),
  // 操作第五步
  StepFive: () =>
    import(
      /* webpackChunkName: "StepFive" */
      "@/views/StepFive.vue"
    ),
  // 操作第六步
  StepSix: () =>
    import(
      /* webpackChunkName: "StepSix" */
      "@/views/StepSix.vue"
    ),
  // 404
  404: () =>
    import(
      /* webpackChunkName: '404' */
      "@/views/404.vue"
    )
  // 404
};

export default routes;
