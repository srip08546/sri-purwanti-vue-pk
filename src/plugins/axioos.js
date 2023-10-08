import Vue from "vue"; // in Vue 2
// import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

export default new Vue.use(VueAxios, axios);
