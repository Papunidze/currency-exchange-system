const required = (type: string) => `This ${type} field is required`;
const min = (type: string, min: number) =>
  `${type} must be at least ${min} ${
    type === "string" ? "characters" : "in value"
  }`;
const max = (type: string, max: number) =>
  `${type} must not exceed ${max} ${
    type === "string" ? "characters" : "in value"
  }`;
const email = "Invalid email address";
const url = "Invalid URL format";
const alpha = "Only alphabetic characters allowed";
const alphanumeric = "Only alphanumeric characters allowed";
const numeric = "Only numeric characters allowed";
const phone = "Invalid phone number format";

export const DEFAULT_MESSAGES = {
  required,
  min,
  max,
  email,
  url,
  alpha,
  alphanumeric,
  numeric,
  phone,
} as const;
