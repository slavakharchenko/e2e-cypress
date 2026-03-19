import dotenv from "dotenv";

dotenv.config();

const baseUrls: Record<string, string> = {
  dev: "https://www.cypress.io",
  staging: "https://www.cypress.io",
  prod: "https://www.cypress.io",
};

export function getConfig() {
  const envName = process.env.ENV || "dev";
  const baseUrl = baseUrls[envName];

  if (!baseUrl) {
    throw new Error(
      `Unknown environment: "${envName}". Expected one of: ${Object.keys(baseUrls).join(", ")}`,
    );
  }

  return { envName, baseUrl };
}
