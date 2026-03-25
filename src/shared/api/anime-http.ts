import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/api";

const animeHttp: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

animeHttp.interceptors.response.use(
  (res) => res,
  function (error: AxiosError) {
    const status = error.response?.status;
    if (!status || status >= 500) {
      console.error("Server error. Try again later.");
    }

    return Promise.reject(error);
  },
);

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await animeHttp.get<T>(url, config);
  return response.data;
}

async function post<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await animeHttp.post<T>(url, data, config);
  return response.data;
}

async function put<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await animeHttp.put<T>(url, data, config);
  return response.data;
}

async function patch<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await animeHttp.patch<T>(url, data, config);
  return response.data;
}

async function remove<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await animeHttp.delete<T>(url, config);
  return response.data;
}

export const animeApiHttp = {
  get,
  post,
  put,
  patch,
  remove,
};
