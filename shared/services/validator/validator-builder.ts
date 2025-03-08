import { DEFAULT_MESSAGES } from '@app-shared/constants/messages';
import { ValidatorFn } from './validator-builder.interfaces';
import { REGEX_PATTERNS } from '@app-shared/constants';

export class ValidationBuilder<T> {
  private readonly validations: ValidatorFn<T>[] = [];

  constructor(private readonly type: string) {}

  required(message?: string): this {
    this.validations.push((value: T) => {
      console.log(this);
      if (value === undefined || value === null || value === '')
        return message || DEFAULT_MESSAGES.required({ field: this.type });
      if (Array.isArray(value) && value.length === 0)
        return message || DEFAULT_MESSAGES.required({ field: this.type });
      return undefined;
    });
    return this;
  }

  min(minValue: number, message?: string): this {
    this.validations.push((value: T) => {
      if (value === undefined || value === null) return undefined;

      if (typeof value === 'string' && value.length < minValue) {
        return (
          message ||
          DEFAULT_MESSAGES.min({
            field: this.type,
            min: minValue,
            type: 'string',
          })
        );
      } else if (typeof value === 'number' && value < minValue) {
        return (
          message ||
          DEFAULT_MESSAGES.min({
            field: this.type,
            min: minValue,
            type: 'number',
          })
        );
      }
      return undefined;
    });
    return this;
  }

  max(maxValue: number, message?: string): this {
    this.validations.push((value: T) => {
      if (value === undefined || value === null) return undefined;

      if (typeof value === 'string' && value.length > maxValue) {
        return (
          message ||
          DEFAULT_MESSAGES.max({
            field: this.type,
            max: maxValue,
            type: 'string',
          })
        );
      } else if (typeof value === 'number' && value > maxValue) {
        return (
          message ||
          DEFAULT_MESSAGES.max({
            field: this.type,
            max: maxValue,
            type: 'number',
          })
        );
      }
      return undefined;
    });
    return this;
  }

  matches(pattern: RegExp, message: string): this {
    this.validations.push((value: T) => {
      if (value === undefined || value === null) return undefined;

      if (typeof value === 'string' && !pattern.test(value)) {
        return message;
      }
      return undefined;
    });
    return this;
  }

  private patternValidator(
    pattern: RegExp,
    message?: string,
    defaultMessage?: string,
  ): this {
    return this.matches(pattern, message || defaultMessage || '');
  }

  email(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.email,
      message,
      DEFAULT_MESSAGES.email({ field: this.type }),
    );
  }

  password(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.passwordMedium,
      message,
      DEFAULT_MESSAGES.password({ field: this.type }),
    );
  }

  url(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.url,
      message,
      DEFAULT_MESSAGES.url({ field: this.type }),
    );
  }

  alpha(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.alpha,
      message,
      DEFAULT_MESSAGES.alpha({ field: this.type }),
    );
  }

  alphanumeric(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.alphanumeric,
      message,
      DEFAULT_MESSAGES.alphanumeric({ field: this.type }),
    );
  }

  numeric(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.numeric,
      message,
      DEFAULT_MESSAGES.numeric({ field: this.type }),
    );
  }

  phone(message?: string): this {
    return this.patternValidator(
      REGEX_PATTERNS.phone,
      message,
      DEFAULT_MESSAGES.phone({ field: this.type }),
    );
  }

  test(message: string, fn: (value: T, formData?: FormData) => boolean): this {
    this.validations.push((value: T, formData?: FormData) => {
      return fn(value, formData) ? undefined : message;
    });
    return this;
  }

  oneOf(validators: ValidatorFn<T>[], message?: string): this {
    this.validations.push((value: T, formData?: FormData) => {
      for (const validator of validators) {
        if (!validator(value, formData)) {
          return undefined;
        }
      }
      return (
        message || `One of the validation rules must pass for ${this.type}`
      );
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

  toValidator(): ValidatorFn<T> {
    const validatorFn = this.build();
    return validatorFn;
  }
}
