import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  abData: {},

  loading: {
    fetch: false,
    add: false,
    update: false,
    delete: false,
  },

  errorMessage: "",

  settings: {
    appName: "家計簿！",
    appUrl: "",
    authToken: "",
    strIncomeItems: "",
  },
};

const store = new Vuex.Store({
  state,
});

export default store;
