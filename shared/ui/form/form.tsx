"use client";

import { ReactNode, useState } from "react";
import Button from "ui/button";
import { ButtonVariant } from "ui/button/button";
import FormControl from "./form-controls";
import styles from "./form.module.scss";
import { FormItem } from "app/signin/scheme";

export interface FormProps<T> {
  submitButtonLabel?: string;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  btnStyle?: ButtonVariant;
  schema: FormItem[];
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  children?: ReactNode;
}

const Form = <T,>({
  submitButtonLabel = "Submit",
  submitButtonProps,
  btnStyle = "btn-primary",
  schema,
  onSubmit,
  isLoading,
  children,
  ...props
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(() => ({} as T));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget as HTMLFormElement);
    schema.forEach((control) => {
      const value = form.get(control.name);
      if (!value && control.validators?.required) {
        setErrors((prev) => ({
          ...prev,
          [control.name]: `${control.label} is required.`,
        }));
        return;
      }
      for (const validator in control.validators) {
        if (validator === "required") continue;
        const regex = control.validators[validator] as RegExp;
        if (!regex.test(value as string)) {
          setErrors((prev) => ({
            ...prev,
            [control.name]: control.invalid || "Invalid value",
          }));
          return;
        }
      }
    });
    console.log(errors);
    if (Object.keys(errors).length) return;
    onSubmit(formData);
  };

  return (
    <form {...props} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__container}>
        {schema.map((element) => (
          <FormControl
            key={element.name}
            label={element.label}
            name={element.name}
            type={element.type}
            onChange={handleChange}
            error={errors[element.name]}
          />
        ))}
        {children}
        <Button
          disabled={isLoading}
          variant={isLoading ? "btn-loading" : btnStyle}
          type="submit"
          {...submitButtonProps}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
