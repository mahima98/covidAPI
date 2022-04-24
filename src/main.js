import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "../src/index.css";
import Covid from "../src/components/Covid.vue";
import Country from "../src/components/Country.vue";
import Countries from "../src/components/Countries.vue";

const routes = [
  {
    path: "/",
    component: Covid,
    children: [
      {
        path: ":countryName",
        component: Country,
      },
    ],
  },
  {
    path: "/countries",
    component: Countries,
    props: true,
    children: [
      {
        path: ":countryName",
        component: Country,
        name: "singleCountry",
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
