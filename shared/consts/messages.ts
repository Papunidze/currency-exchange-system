export const DEFAULT_MESSAGES = {
  required: (type: string) => `This ${type} field is required`,
  min: (type: string, min: number) =>
    `${type} must be at least ${min} ${
      type === "string" ? "characters" : "in value"
    }`,
  max: (type: string, max: number) =>
    `${type} must not exceed ${max} ${
      type === "string" ? "characters" : "in value"
    }`,
  email: "Invalid email address",
  url: "Invalid URL format",
  alpha: "Only alphabetic characters allowed",
  alphanumeric: "Only alphanumeric characters allowed",
  numeric: "Only numeric characters allowed",
  phone: "Invalid phone number format",
} as const;
