import { type ZodType, type core } from "zod";

export interface SchemaError {
  path: string;
  message: string;
  code: string;
}

interface ValidationSuccess<T> {
  success: true;
  data: T;
  errors: [];
}

interface ValidationFailure {
  success: false;
  data: null;
  errors: SchemaError[];
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function formatIssue(issue: core.$ZodIssue): SchemaError {
  return {
    path: issue.path.map(String).join(".") || "(root)",
    message: issue.message,
    code: issue.code ?? "unknown",
  };
}

/**
 * Validates data against a Zod schema.
 * Returns a result object with either parsed data or a list of errors.
 */
export function validateSchema<T extends ZodType>(
  schema: T,
  data: unknown,
): ValidationResult<core.output<T>> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  return {
    success: false,
    data: null,
    errors: result.error.issues.map(formatIssue),
  };
}

/**
 * Asserts data matches a Zod schema.
 * Throws a descriptive error with all validation issues if validation fails.
 * Returns the parsed (and typed) data on success.
 */
export function assertSchema<T extends ZodType>(schema: T, data: unknown): core.output<T> {
  const result = validateSchema(schema, data);

  if (result.success) {
    return result.data;
  }

  const errorList = result.errors.map((e) => `  [${e.path}] ${e.message} (${e.code})`).join("\n");

  throw new Error(`Schema validation failed:\n${errorList}`);
}
