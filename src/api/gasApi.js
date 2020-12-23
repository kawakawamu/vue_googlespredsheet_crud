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
