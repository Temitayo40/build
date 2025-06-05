import { createApp } from "vue";
import pinia from "./store";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toastify, {
    autoClose: 5000,
  })
  .mount("#app");
