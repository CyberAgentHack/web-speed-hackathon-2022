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
