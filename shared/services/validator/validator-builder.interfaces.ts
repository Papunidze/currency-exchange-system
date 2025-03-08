export type ValidatorFn<T = unknown> = (
  value: T,
  formData?: FormData,
) => string | undefined;

export type Validators =
  | ValidatorFn<string>
  | ValidatorFn<number>
  | ValidatorFn<boolean>;
