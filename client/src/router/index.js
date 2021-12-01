import Vue from "vue";
import VueRouter from "vue-router";

import Graphs from "../views/Graphs";
import ExportData from "../views/ExportData";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Graphs",
    component: Graphs
  },
  {
    path: "/exportData",
    name: "ExportData",
    component: ExportData
  }
]

const router = new VueRouter({
  routes
});

export default router;
