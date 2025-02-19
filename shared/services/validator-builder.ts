import { DEFAULT_MESSAGES } from '@app-shared/constants/messages';
import { REGEX_PATTERNS } from '@app-shared/constants/regexs';
import { ValidatorFn } from '@app-shared/interfaces';

export class ValidationBuilder<T> {
  private readonly validations: ValidatorFn<T>[] = [];

  constructor(private readonly type: string) {}

  required(message?: string): this {
    this.validations.push((value: T) =>
      value ? undefined : message || DEFAULT_MESSAGES.required(this.type),
    );
    return this;
  }

  min(minValue: number, message?: string): this {
    this.validations.push((value: T) => {
      if (typeof value === 'string' && value.length < minValue) {
        return message || DEFAULT_MESSAGES.min(this.type, minValue);
      } else if (typeof value === 'number' && value < minValue) {
        return message || DEFAULT_MESSAGES.min(this.type, minValue);
      }
      return undefined;
    });
    return this;
  }

  max(maxValue: number, message?: string): this {
    this.validations.push((value: T) => {
      if (typeof value === 'string' && value.length > maxValue) {
        return message || DEFAULT_MESSAGES.max(this.type, maxValue);
      } else if (typeof value === 'number' && value > maxValue) {
        return message || DEFAULT_MESSAGES.max(this.type, maxValue);
      }
      return undefined;
    });
    return this;
  }

  matches(pattern: RegExp, message: string): this {
    this.validations.push((value: T) => {
      if (typeof value === 'string' && !pattern.test(value)) {
        return message;
      }
      return undefined;
    });
    return this;
  }

  email(message?: string): this {
    return this.matches(
      REGEX_PATTERNS.email,
      message || DEFAULT_MESSAGES.email,
    );
  }

  url(message?: string): this {
    return this.matches(REGEX_PATTERNS.url, message || DEFAULT_MESSAGES.url);
  }

  alpha(message?: string): this {
    return this.matches(
      REGEX_PATTERNS.alpha,
      message || DEFAULT_MESSAGES.alpha,
    );
  }

  alphanumeric(message?: string): this {
    return this.matches(
      REGEX_PATTERNS.alphanumeric,
      message || DEFAULT_MESSAGES.alphanumeric,
    );
  }

  numeric(message?: string): this {
    return this.matches(
      REGEX_PATTERNS.numeric,
      message || DEFAULT_MESSAGES.numeric,
    );
  }

  phone(message?: string): this {
    return this.matches(
      REGEX_PATTERNS.phone,
      message || DEFAULT_MESSAGES.phone,
    );
  }

  test(message: string, fn: (value: T, formData?: FormData) => boolean): this {
    this.validations.push((value: T, formData?: FormData) => {
      return fn(value, formData) ? undefined : message;
    });
    return this;
  }

  build(): ValidatorFn<T> {
    return (value: T, formData?: FormData) => {
      for (const validation of this.validations) {
        const result = validation(value, formData);
        if (result) return result;
      }
      return undefined;
    };
  }
}
