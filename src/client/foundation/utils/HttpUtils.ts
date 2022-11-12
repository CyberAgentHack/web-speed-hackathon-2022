import axios from "axios";

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
  request.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  return request;
});

axios.interceptors.response.use((response) => {
  if (process.env.NODE_ENV === "development") {
    console.dir(response.data);
  }
  return response;
});
