import { type ZodType } from "zod";
import { validateSchema, assertSchema } from "./schema-validator";

// @ts-expect-error -- Cypress Commands.add overloads don't support generic custom commands
Cypress.Commands.add(
  "validateSchema",
  { prevSubject: true },
  (subject: unknown, schema: ZodType) => {
    return validateSchema(schema, subject);
  },
);

// @ts-expect-error -- Cypress Commands.add overloads don't support generic custom commands
Cypress.Commands.add("assertSchema", { prevSubject: true }, (subject: unknown, schema: ZodType) => {
  return assertSchema(schema, subject);
});
