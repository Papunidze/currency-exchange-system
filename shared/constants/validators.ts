import { ValidationBuilder } from "@app-shared/services";

export const VALIDATORS = {
  string: () => new ValidationBuilder<string>("string"),
  number: () => new ValidationBuilder<number>("number"),
  boolean: () => new ValidationBuilder<boolean>("boolean"),
} as const;
