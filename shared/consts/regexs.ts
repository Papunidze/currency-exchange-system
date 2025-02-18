export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  alpha: /^[A-Za-z]+$/,
  alphanumeric: /^[A-Za-z0-9]+$/,
  numeric: /^[0-9]+$/,
  phone: /^\+?[\d\s-]+$/,
} as const;
