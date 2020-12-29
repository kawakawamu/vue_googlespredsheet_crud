import axios from "axios";

const gasApi = axios.create({
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

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

const fetch = (yartMonth) => {
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
