import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import Unauthorized from "../components/Unauthorized";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/list",
    name: "list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/List.vue")
  },
  {
    path: "/song/:songId",
    name: "song",
    component: () => import(/* webpackChunkName: "song" */ "../views/Song.vue"),
    props: true
  },
  {
    path: "/creator",
    name: "creator",
    component: () =>
      import(/* webpackChunkName: "creator" */ "../views/Creator.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/401",
    component: Unauthorized
  },
  { path: "/404", component: NotFound },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogged) {
      next();
      return;
    }
    next("/401");
  } else {
    next();
  }
});

export default router;
