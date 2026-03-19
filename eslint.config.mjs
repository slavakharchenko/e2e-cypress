import tseslint from "typescript-eslint";
import eslintPluginCypress from "eslint-plugin-cypress";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["node_modules/", "cypress/downloads/", "cypress/screenshots/", "cypress/videos/"],
  },
  tseslint.configs.recommended,
  {
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      ...eslintPluginCypress.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
);
