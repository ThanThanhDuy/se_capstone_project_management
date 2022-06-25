import axios from "axios";
import queryString from "query-string";
//config
const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "access-control-allow-origin"
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data) {
    config.headers.Authorization = `Bearer ${data?.AccessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  error => {
    throw error;
  }
);
export default axiosClient;
