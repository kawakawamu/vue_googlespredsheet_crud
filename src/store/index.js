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
  updateAbData(state, { yearMonth, id }) {
    const list = state.abData[yearMonth];
    if (list) {
      const index = list.findIndex((v) => v.id === item.id);
      list.splice(index, 1, item);
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
    document.title = appName;
    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
    state.abData = {};

    localStorage.setItem("settings", JSON.stringify(settings));
  },

  loadSettings(state) {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings) {
      state.settings = Object.assign(state.settings, settings);
    }
    const { appName, apiUrl, authToken } = state.settings;
    document.title = appName;
    gasApi.setUrl(apiUrl);
    gasApi.setAuthToken(authToken);
  },
};

const actions = {
  async fetchAbData({ commit }, { yearMonth }) {
    const type = "fetch";
    commit("setLoading", { type, v: true })
    try {
      const res = await gasApi.fetch(yearMonth);
      commit("setAbData", { yearMonth, list: res.data });
    } catch (e) {
      commit("setErrorMessage", { message: e });
      commit("setAbData", { yearMonth, list: [] });
    } finally {
      commit("setLoading", { type, v: false });
    }
  },
  async addAbData({commit}, {item}) {
    const type = "add";
    commit("setLoading", { type, v: true });
    try {
      const res = await gasApi.add(item);
    } catch (e) {
      commit("setErrorMessage", { message: e });
    }
  }
},

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

export default store;
