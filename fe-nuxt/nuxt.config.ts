import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-07-15",
   devtools: { enabled: true },
   modules: ["@nuxt/eslint", "@pinia/nuxt"],
   css: ["~/assets/css/main.css"],
   vite: { plugins: [tailwindcss()] },
   runtimeConfig: {
      serverBaseUrl: process.env.SERVER_BACKEND_URL,
      isDocker: process.env.IS_DOCKER,
      public: {
         clientBaseUrl: process.env.NUXT_BACKEND_URL,
      },
   },
   pinia: {
      storesDirs: ["stores", "app/stores/**"],
   },
});
