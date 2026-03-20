import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  baseUrl: string;
  apiUrl: string;
}

const environments: Record<string, EnvConfig> = {
  dev: {
    baseUrl: "https://www.cypress.io",
    apiUrl: "https://api.example.com",
  },
  staging: {
    baseUrl: "https://www.cypress.io",
    apiUrl: "https://api.example.com",
  },
  prod: {
    baseUrl: "https://www.cypress.io",
    apiUrl: "https://api.example.com",
  },
};

export function getConfig() {
  const envName = process.env.ENV || "dev";
  const env = environments[envName];

  if (!env) {
    throw new Error(
      `Unknown environment: "${envName}". Expected one of: ${Object.keys(environments).join(", ")}`,
    );
  }

  return { envName, ...env };
}
