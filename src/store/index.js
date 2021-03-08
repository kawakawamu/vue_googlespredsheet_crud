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
    apiUrl:
      "https://script.google.com/macros/s/AKfycbzFEyBSTh5lLTKayq8SoCENeC7fvUCsuEyzKpVyfi-5_tdehr_4sEOoGA/exec",
    authToken: "88638c0c-7519-11eb-9439-0242ac130002",
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
  updateAbData(state, { yearMonth, item }) {
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

  saveSettings(state, { settings }) {
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
    commit("setLoading", { type, v: true });
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
  async addAbData({ commit }, { item }) {
    const type = "add";
    commit("setLoading", { type, v: true });
    try {
      const res = await gasApi.add(item);
      commit("addAbData", { item: res.data });
    } catch (e) {
      commit("setErrorMessage", { message: e });
    } finally {
      commit("setLoading", { type, v: false });
    }
  },

  async updataAbData({ commit }, { beforeYM, item }) {
    const type = "update";
    console.log("actionしている");
    const yearMonth = item.date.slice(0, 7);
    commit("setLoading", { type, v: true });
    try {
      const res = await gasApi.update(beforeYM, item);
      if (yearMonth === beforeYM) {
        commit("updateAbData", { yearMonth, item });
        return;
      }
      const id = item.id;
      commit("deleteAbData", { yearMonth: beforeYM, id });
      commit("addAbData", { item: res.data });
    } catch (e) {
      commit("setErrorMessage", { message: e });
    } finally {
      commit("setLoading", { type, v: false });
    }
  },

  async deleteAbData({ commit }, { item }) {
    const type = "delete";
    const yearMonth = item.date.slice(0, 7);
    const id = item.id;
    commit("setLoading", { type, v: true });
    try {
      await gasApi.delete(yearMonth, id);
      commit("delteAbData", { yearMonth, id });
    } catch (e) {
      commit("setErrorMessage", { message: e });
    } finally {
      commit("setLoading", { type, v: false });
    }
  },

  saveSettings({ commit }, { settings }) {
    commit("saveSettings", { settings });
  },

  loadSettings({ commit }) {
    commit("loadSettings");
  },
};

const createItems = (v) =>
  v
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length !== 0);

const getters = {
  incomeItems(state) {
    return createItems(state.settings.strIncomeItems);
  },
  outgoItems(state) {
    return createItems(state.settings.strOutgoItems);
  },
  tagItems(state) {
    return createItems(state.settings.strTagItems);
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
