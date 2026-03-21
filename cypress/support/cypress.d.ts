import { type ZodType } from "zod";
import { type ValidationResult } from "./schema-validator";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Validates the subject against a Zod schema.
       * Returns `{ success, data, errors }` without failing the test.
       */
      validateSchema<T>(schema: ZodType<T>): Chainable<ValidationResult<T>>;

      /**
       * Asserts the subject matches a Zod schema.
       * Fails the test with a detailed error list if validation fails.
       * Returns the parsed, typed data on success.
       */
      assertSchema<T>(schema: ZodType<T>): Chainable<T>;
    }
  }
}
