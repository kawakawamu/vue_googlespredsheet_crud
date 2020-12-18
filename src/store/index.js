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
    strOutgoItems: "",
    strTagItems: "",
  },
};

const mutations = {
  setAbData(this, { yearMonth, list }) {
    state.abData[yearMonth] = list;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
});

export default store;
