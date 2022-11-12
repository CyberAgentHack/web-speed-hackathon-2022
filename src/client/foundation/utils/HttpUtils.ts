import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://wsh-tsuyoshi-nishikawa.herokuapp.com"
  : "http://0.0.0.0:8888";

export const jsonFetcher = async <T>(url: string) => {
  const res = await axios.get<T>(url, { responseType: "json" });
  return res.data;
};

export const authorizedJsonFetcher = async <T>(url: string, userId: string) => {
  const res = await axios.get<T>(url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};

axios.interceptors.request.use((request) => {
  request.baseURL = BASE_URL
  return request;
});

axios.interceptors.response.use((response) => {
  if (process.env.AXIOS_LOGGING === "true") {
    console.dir(response.data);
  }
  return response;
});
