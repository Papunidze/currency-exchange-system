import { ValidationBuilder, Validators } from '@app-shared/services/validator';

export const V = {
  string: () => new ValidationBuilder<string>('string'),
  number: () => new ValidationBuilder<number>('number'),
  boolean: () => new ValidationBuilder<boolean>('boolean'),
} as const;

export const VALIDATORS = {
  required: (): Validators => V.string().required().toValidator(),
  email: (): Validators => V.string().required().email().toValidator(),
  password: (): Validators =>
    V.string().required().password().min(8).toValidator(),
  phone: (): Validators => V.string().required().phone().toValidator(),
  url: (): Validators => V.string().required().url().toValidator(),

  numeric: (): Validators => V.number().required().toValidator(),
  positiveNumber: (): Validators => V.number().required().min(0).toValidator(),
  percentage: (): Validators =>
    V.number().required().min(0).max(100).toValidator(),

  nameField: (): Validators =>
    V.string().required().min(2).max(50).toValidator(),
  descriptionField: (): Validators =>
    V.string().min(10).max(1000).toValidator(),

  numberRange: (min: number, max: number): Validators =>
    V.number().required().min(min).max(max).toValidator(),

  stringLength: (min: number, max: number): Validators =>
    V.string().required().min(min).max(max).toValidator(),
} as const;
