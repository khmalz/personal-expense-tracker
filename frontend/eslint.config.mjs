import eslintJs from "@eslint/js";
import nextPlugin from "eslint-config-next";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintignore from "./eslintignore.mjs";

export default defineConfig([
   eslintignore,
   nextPlugin,
   eslintJs.configs.recommended,
   ...tseslint.configs.recommended,
   {
      files: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.node,
            React: "readonly",
         },
      },
       extends: compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@next/next/recommended",
        "prettier",
    ),
      rules: {
         // "react-hooks/set-state-in-effect": "error",
      },
   },
]);
