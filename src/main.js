import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axioos";
import store from "./store/index";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
