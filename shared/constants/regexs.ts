export const REGEX_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  alpha: /^[A-Za-zÀ-ÿ\s]+$/,
  alphanumeric: /^[A-Za-z0-9\s]+$/,
  numeric: /^[0-9]+$/,
  decimal: /^-?\d*\.?\d+$/,
  phone: /^\+?[1-9](?:[0-9-\s()]{5,20}[0-9])$/,

  passwordWeak: /^[A-Za-z\d@$!%*?&]{6,}$/,
  passwordMedium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  passwordStrong:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/,

  dateISO: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  time24: /^([01]\d|2[0-3]):([0-5]\d)$/,
  time12: /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i,
  dateTime:
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/,

  currency: /^-?\$?\d+(,\d{3})*(\.\d{2})?$/,
  percentage: /^-?(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)%?$/,
  scientificNotation: /^-?\d+(\.\d+)?[eE][+-]?\d+$/,

  zipCode: /^\d{5}(-\d{4})?$/,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i,
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  imageFile: /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i,
  documentFile: /\.(pdf|doc|docx|txt|rtf|md|csv|xlsx?)$/i,
  videoFile: /\.(mp4|webm|mov|avi|mkv)$/i,
  audioFile: /\.(mp3|wav|ogg|m4a)$/i,

  username: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/,
  hashtag: /^#[A-Za-z]\w*$/,
  twitterHandle: /^@[A-Za-z]\w{1,15}$/,

  base64: /^[A-Za-z0-9+/]*={0,2}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
} as const;

// Type for regex keys
export type RegexPatternKey = keyof typeof REGEX_PATTERNS;
