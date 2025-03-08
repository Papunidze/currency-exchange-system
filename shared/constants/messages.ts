import { InputType } from '@app-shared/ui/input';

export interface MessageParams {
  field?: string;
  min?: number;
  max?: number;
  type?: InputType;
  value?: string | number;
  pattern?: string;
  allowed?: string[];
}

const required = (params: MessageParams) =>
  `${params.field || 'This field'} is required`;

const min = (params: MessageParams) => {
  if (params.type === 'string') {
    return `${params.field || 'This field'} must be at least ${params.min} characters long`;
  }
  return `${params.field || 'This field'} must be greater than or equal to ${params.min}`;
};

const max = (params: MessageParams) => {
  if (params.type === 'string') {
    return `${params.field || 'This field'} must not exceed ${params.max} characters`;
  }
  return `${params.field || 'This field'} must be less than or equal to ${params.max}`;
};

const email = (params: MessageParams) =>
  `Please enter a valid email address${params.field ? ` for ${params.field}` : ''}`;

const url = (params: MessageParams) =>
  `Please enter a valid URL${params.field ? ` for ${params.field}` : ''}`;

const alpha = (params: MessageParams) =>
  `${params.field || 'This field'} must contain only letters`;

const alphanumeric = (params: MessageParams) =>
  `${params.field || 'This field'} must contain only letters and numbers`;

const numeric = (params: MessageParams) =>
  `${params.field || 'This field'} must contain only numbers`;

const phone = (params: MessageParams) =>
  `Please enter a valid phone number${params.field ? ` for ${params.field}` : ''}`;

const password = (params: MessageParams) => {
  const requirements = [
    'at least 8 characters',
    'one uppercase letter',
    'one lowercase letter',
    'one number',
    'one special character',
  ];
  return `Password must contain ${requirements.join(', ')}`;
};

const pattern = (params: MessageParams) =>
  `${params.field || 'This field'} must match the pattern: ${params.pattern}`;

const oneOf = (params: MessageParams) =>
  `${params.field || 'This field'} must be one of: ${params.allowed?.join(', ')}`;

const date = (params: MessageParams) =>
  `Please enter a valid date${params.field ? ` for ${params.field}` : ''}`;

const fileType = (params: MessageParams) =>
  `${params.field || 'File'} must be of type: ${params.allowed?.join(', ')}`;

const fileSize = (params: MessageParams) =>
  `${params.field || 'File'} size must not exceed ${params.max} MB`;

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
  password,
  pattern,
  oneOf,
  date,
  fileType,
  fileSize,
} as const;

export type MessageKey = keyof typeof DEFAULT_MESSAGES;
