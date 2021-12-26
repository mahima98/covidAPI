import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "../src/index.css";
import Foods from "../src/components/Foods.vue";
import Animals from "../src/components/Animals.vue";
import HelloWorld from "../src/components/HelloWorld.vue";
import Dogs from "../src/components/Dogs.vue";
import Covid from "../src/components/Covid.vue";
import Country from "../src/components/Country.vue";
import Countries from "../src/components/Countries.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: HelloWorld,
  },
  {
    path: "/animals",
    component: Animals,
    children: [
      {
        path: "dogs",
        component: Dogs,
      },
    ],
  },
  {
    path: "/covid",
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
    children: [
      {
        path: ":countryName",
        component: Country,
        name: "singleCountry",
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
