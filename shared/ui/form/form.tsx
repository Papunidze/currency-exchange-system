"use client";

import { useState } from "react";

import FormControl from "./form-control/form-controls";
import styles from "./form.module.scss";
import { FormProps } from "@app-shared/interfaces";
import Button from "../button";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    schema.forEach((control) => {
      const value = formData.get(control.name) as string;

      if (control.validators) {
        const validationResult = control.validators(value, formData);
        if (validationResult) {
          newErrors[control.name] = validationResult;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);

    const formValues = {} as T;
    schema.forEach((field) => {
      const value = form.get(field.name);
      formValues[field.name as keyof T] = value as T[keyof T];
    });

    const isValid = validateForm(form);

    if (isValid) {
      onSubmit(formValues);
    }
  };

  return (
    <form {...props} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__container}>
        {schema.map((element) => (
          <FormControl
            key={element.name}
            label={element.label}
            name={element.name}
            type={element.type || "text"}
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
