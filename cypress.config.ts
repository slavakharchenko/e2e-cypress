import { defineConfig } from "cypress";
import { getConfig } from "./config";
import { destroyDb } from "./cypress/db";

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
    setupNodeEvents(on) {
      on("task", {
        // Register DB task functions here:
        // ...dbTasks,
      });

      on("after:run", async () => {
        await destroyDb();
      });
    },
  },
});
