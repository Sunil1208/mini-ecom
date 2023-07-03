// import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

// import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";

export default new Vuex.Store({
  modules: {
    auth,
  },
});
