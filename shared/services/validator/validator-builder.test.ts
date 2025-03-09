import { ValidationBuilder } from './validator-builder';
import { DEFAULT_MESSAGES } from '@app-shared/constants/messages';
import { REGEX_PATTERNS } from '@app-shared/constants';

describe('ValidationBuilder', () => {
  let validator: ValidationBuilder<any>;

  beforeEach(() => {
    validator = new ValidationBuilder('testField');
  });

  describe('required', () => {
    it('should return error message for undefined value', () => {
      const validate = validator.required().build();
      expect(validate(undefined)).toBe(
        DEFAULT_MESSAGES.required({ field: 'testField' }),
      );
    });

    it('should return error message for null value', () => {
      const validate = validator.required().build();
      expect(validate(null)).toBe(
        DEFAULT_MESSAGES.required({ field: 'testField' }),
      );
    });

    it('should return error message for empty string', () => {
      const validate = validator.required().build();
      expect(validate('')).toBe(
        DEFAULT_MESSAGES.required({ field: 'testField' }),
      );
    });

    it('should return error message for empty array', () => {
      const validate = validator.required().build();
      expect(validate([])).toBe(
        DEFAULT_MESSAGES.required({ field: 'testField' }),
      );
    });

    it('should return undefined for valid value', () => {
      const validate = validator.required().build();
      expect(validate('test')).toBeUndefined();
    });
  });

  describe('min', () => {
    it('should validate string length', () => {
      const validate = validator.min(3).build();
      expect(validate('ab')).toBe(
        DEFAULT_MESSAGES.min({ field: 'testField', min: 3, type: 'string' }),
      );
      expect(validate('abc')).toBeUndefined();
    });

    it('should validate number value', () => {
      const validate = validator.min(5).build();
      expect(validate(4)).toBe(
        DEFAULT_MESSAGES.min({ field: 'testField', min: 5, type: 'number' }),
      );
      expect(validate(6)).toBeUndefined();
    });
  });

  describe('max', () => {
    it('should validate string length', () => {
      const validate = validator.max(3).build();
      expect(validate('abcd')).toBe(
        DEFAULT_MESSAGES.max({ field: 'testField', max: 3, type: 'string' }),
      );
      expect(validate('abc')).toBeUndefined();
    });

    it('should validate number value', () => {
      const validate = validator.max(5).build();
      expect(validate(6)).toBe(
        DEFAULT_MESSAGES.max({ field: 'testField', max: 5, type: 'number' }),
      );
      expect(validate(4)).toBeUndefined();
    });
  });

  describe('email', () => {
    it('should validate email format', () => {
      const validate = validator.email().build();
      expect(validate('invalid-email')).toBe(
        DEFAULT_MESSAGES.email({ field: 'testField' }),
      );
      expect(validate('test@example.com')).toBeUndefined();
    });
  });

  describe('password', () => {
    it('should validate password format', () => {
      const validate = validator.password().build();
      expect(validate('weak')).toBe(
        DEFAULT_MESSAGES.password({ field: 'testField' }),
      );
      expect(validate('StrongP@ss123')).toBeUndefined();
    });
  });

  describe('url', () => {
    it('should validate URL format', () => {
      const validate = validator.url().build();
      expect(validate('invalid-url')).toBe(
        DEFAULT_MESSAGES.url({ field: 'testField' }),
      );
      expect(validate('https://example.com')).toBeUndefined();
    });
  });

  describe('alpha', () => {
    it('should validate alphabetic characters', () => {
      const validate = validator.alpha().build();
      expect(validate('123')).toBe(
        DEFAULT_MESSAGES.alpha({ field: 'testField' }),
      );
      expect(validate('abc')).toBeUndefined();
    });
  });

  describe('alphanumeric', () => {
    it('should validate alphanumeric characters', () => {
      const validate = validator.alphanumeric().build();
      expect(validate('abc@123')).toBe(
        DEFAULT_MESSAGES.alphanumeric({ field: 'testField' }),
      );
      expect(validate('abc123')).toBeUndefined();
    });
  });

  describe('numeric', () => {
    it('should validate numeric characters', () => {
      const validate = validator.numeric().build();
      expect(validate('abc')).toBe(
        DEFAULT_MESSAGES.numeric({ field: 'testField' }),
      );
      expect(validate('123')).toBeUndefined();
    });
  });

  describe('phone', () => {
    it('should validate phone number format', () => {
      const validate = validator.phone().build();
      expect(validate('invalid-phone')).toBe(
        DEFAULT_MESSAGES.phone({ field: 'testField' }),
      );
      expect(validate('+1234567890')).toBeUndefined();
    });
  });

  describe('test', () => {
    it('should run custom validation function', () => {
      const customMessage = 'Custom error message';
      const validate = validator
        .test(customMessage, (value) => value === 'valid')
        .build();
      expect(validate('invalid')).toBe(customMessage);
      expect(validate('valid')).toBeUndefined();
    });
  });

  describe('oneOf', () => {
    it('should validate that at least one validator passes', () => {
      const validate = validator
        .oneOf([
          (value) => (value === 'a' ? undefined : 'not a'),
          (value) => (value === 'b' ? undefined : 'not b'),
        ])
        .build();
      expect(validate('c')).toBe(
        'One of the validation rules must pass for testField',
      );
      expect(validate('a')).toBeUndefined();
      expect(validate('b')).toBeUndefined();
    });
  });

  describe('chain validation', () => {
    it('should chain multiple validations', () => {
      const validate = validator
        .required()
        .min(3)
        .max(10)
        .alphanumeric()
        .build();

      expect(validate('')).toBe(
        DEFAULT_MESSAGES.required({ field: 'testField' }),
      );
      expect(validate('a')).toBe(
        DEFAULT_MESSAGES.min({ field: 'testField', min: 3, type: 'string' }),
      );
      expect(validate('abcdefghijk')).toBe(
        DEFAULT_MESSAGES.max({ field: 'testField', max: 10, type: 'string' }),
      );
      expect(validate('abc@123')).toBe(
        DEFAULT_MESSAGES.alphanumeric({ field: 'testField' }),
      );
      expect(validate('abc123')).toBeUndefined();
    });
  });
});
