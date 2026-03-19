import { defineConfig } from "cypress";
import { getConfig } from "./config";

const { envName, baseUrl } = getConfig();

export default defineConfig({
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
    setupNodeEvents(on, config) {
      config.env.envName = envName;
      return config;
    },
  },
});
