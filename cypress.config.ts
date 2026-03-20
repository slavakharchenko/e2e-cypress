import { defineConfig } from "cypress";
import { getConfig } from "./config";

const { envName, baseUrl, apiUrl } = getConfig();

export default defineConfig({
  allowCypressEnv: false,
  expose: {
    envName,
    apiUrl,
  },
  e2e: {
    baseUrl,
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
