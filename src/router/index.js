import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import(/* webpackChunkName: "Profile" */ "../views/Blogs.vue"),
  },
  {
    path: "/blog/:id",
    name: "Blog",
    component: () => import(/* webpackChunkName: "Profile" */ "../views/Blog.vue"),
  },
  {
    path: "/About",
    name: "About",
    component: () => import(/* webpackChunkName: "Profile" */ "../views/About.vue"),
  },
  {
    path: "/New",
    name: "New",
    component: () => import(/* webpackChunkName: "Profile" */ "../views/NewArticle.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
