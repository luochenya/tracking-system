import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/index.scss"; 
// 谷歌地图
import * as VueGoogleMaps from 'vue2-google-maps'

import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Form,
  FormItem,
  Message,
  Input,
  Select,
  Option,
  MessageBox,
  Checkbox,
  Dialog,
  Popover
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Popover);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

// 谷歌地图
Vue.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyAJ2P9Vsfu9p91zeBVFF-JnVinq5yrM-ZY',
      libraries: '3.26',
  },
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
