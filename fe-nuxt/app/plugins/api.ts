import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const baseURL =
    import.meta.server && config.isDocker === "true"
      ? config.serverBaseUrl
      : config.public.clientBaseUrl;

  const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return {
    provide: {
      axios: api,
    },
  };
});
