import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  settings: {
    appName: "家計簿！",
  },
};

const store = new Vuex.Store({
  state,
});

export default store;
