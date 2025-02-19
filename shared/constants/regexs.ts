const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const url = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const alpha = /^[A-Za-z]+$/;
const alphanumeric = /^[A-Za-z0-9]+$/;
const numeric = /^[0-9]+$/;
const phone = /^\+?[\d\s-]+$/;
const temp = '';
export const REGEX_PATTERNS = {
  email,
  url,
  alpha,
  alphanumeric,
  numeric,
  phone,
} as const;
