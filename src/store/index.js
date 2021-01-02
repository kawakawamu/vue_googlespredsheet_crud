import Vue from "vue";
import Vuex from "vuex";
import gasApi from "../api/gasApi";

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
  setAbData(state, { yearMonth, list }) {
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
  setLoading(state, { type, v }) {
    state.loading[type] = v;
  },

  setErrorMessage(state, { message }) {
    state.errorMessage = message;
  },

  saveSettings(state, { message }) {
    state.settings = { ...settings };
    const { appName, apiUrl, authToken } = state.settings;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
});

export default store;
