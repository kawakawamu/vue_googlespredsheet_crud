import axios from "axios";

const gasApi = axios.create({
  headers: { "content-type": "application/x-www-form-urlencoded" },
});
