import {
  axios,
  build,
  buildModules,
  css,
  firebase,
  head,
  middleware,
  modules,
  plugins,
  pwa,
  vuetify
} from "./src/configs/index";

export default {
  components: true,
  srcDir: "./src",
  head,
  css,
  plugins,
  buildModules,
  modules,
  middleware,
  axios,
  pwa,
  firebase,
  vuetify,
  build,
  server: {
    port: 8080,
    host: "0.0.0.0"
  }
};
