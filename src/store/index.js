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
  addAbData(state, { item }) {
    const yearMonth = item.date.slice(0, 7);
    const list = state.abData[yearMonth];
    if (list) {
      list.push(item);
    }
  },
  deleteAbData(state, { yearMonth, id }) {
    const list = state.abData[yearMonth];
    if (list) {
      const index = list.findIndex((v) => v.id === id);
      list.splice(index, 1);
    }
  },
};

const store = new Vuex.Store({
  state,
  mutations,
});

export default store;
