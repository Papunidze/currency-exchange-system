"use client";

import { ReactNode, useState } from "react";
import { z, ZodError } from "zod";
import Button from "ui/button";
import { ButtonVariant } from "ui/button/button";
import FormControl from "./form-controls";
import styles from "./form.module.scss";

export interface FormProps<T> {
  submitButtonLabel?: string;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  btnStyle?: ButtonVariant;
  schema: z.ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  children?: ReactNode;
}

const Form = <T,>({
  submitButtonLabel = "Submit",
  submitButtonProps,
  btnStyle = "btn-primary",
  schema,
  initialValues,
  onSubmit,
  isLoading,
  children,
  ...props
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.parseAsync(formData);
      setErrors({});
      onSubmit(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <form {...props} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__container}>
        {Object.keys(formData as object).map((element) => (
          <FormControl
            key={element}
            label={element}
            name={element.toLowerCase()}
            type="text"
            onChange={handleChange}
            error={errors[element]}
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
