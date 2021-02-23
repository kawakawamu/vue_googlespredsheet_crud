import axios from "axios";

const gasApi = axios.create({
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

// リクエスト先のURLを変更する
gasApi.defaults.baseURL =
  "https://script.google.com/macros/s/AKfycbzFEyBSTh5lLTKayq8SoCENeC7fvUCsuEyzKpVyfi-5_tdehr_4sEOoGA/exec";

gasApi.interceptors.response.use(
  (res) => {
    if (res.data.error) {
      return Promise.reject(res.data.error);
    }
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * APIのURLを設定します
 * @param {String} url
 */
const setUrl = (url) => {
  gasApi.defaults.baseURL = url;
};

/**
 * authTokenを設定します
 * @param {String} token
 */
let authToken = "";
const setAuthToken = (token) => {
  authToken = token;
};

/**
 * 指定年月のデータを取得します
 * @param {String} yearMonth
 * @returns {Promise}
 */

const fetch = (yearMonth) => {
  return gasApi.post("", {
    method: "GET",
    authToken,
    params: {
      yearMonth,
    },
  });
};

const add = (item) => {
  return gasApi.post("", {
    method: "POST",
    authToken,
    params: {
      item,
    },
  });
};

//削除
const $delete = (yearMonth, id) => {
  return gasApi.post("", {
    method: "DELETE",
    authToken,
    params: {
      yearMonth,
      id,
    },
  });
};

//更新
const update = (beforeYM, item) => {
  return gasApi.post("", {
    method: "PUT",
    authToken,
    params: {
      beforeYM,
      item,
    },
  });
};

export default {
  setUrl,
  setAuthToken,
  fetch,
  add,
  delete: $delete,
  update,
};
