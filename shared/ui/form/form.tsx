'use client';

import React from 'react';
import Button from '@app-shared/ui/button';
import Input from '@app-shared/ui/input';
import Select from '@app-shared/ui/select';
import styles from './form.module.scss';
import { FormProps } from './form.inerfaces';
import { SchemaField, SelectField } from '@app-shared/services/schema';
import { cn } from '@app-shared/lib/utils';

function CreateForm<T>({
  schema,
  onSubmit,
  defaultValues,
  isLoading = false,
  submitLabel = 'Submit',
  selectVariant = 'primary',
  buttonVariant = 'primary',
  className = '',
  size = 'small',
  title = '',
  content,
  children,
}: FormProps<T>) {
  const [formData, setFormData] = React.useState<Record<string, unknown>>(
    (defaultValues as Record<string, unknown>) || {},
  );

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  // Convert formData to FormData object for validators
  const createFormDataObject = (): FormData => {
    const fData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fData.append(key, String(value));
      }
    });
    return fData;
  };

  const validateField = (field: SchemaField, value: string) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }

    if (field.validators) {
      // Create FormData object to pass to validators
      const formDataObj = createFormDataObject();

      // Call the validator with both the value and the FormData
      return (
        field.validators as (
          val: string,
          formData?: FormData,
        ) => string | undefined
      )(value, formDataObj);
    }

    return undefined;
  };

  const handleChange = (field: SchemaField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));

    if (isSubmitted && errors[field.name]) {
      setErrors((prev) => ({
        ...prev,
        [field.name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    schema.forEach((field) => {
      const value = String(formData[field.name] || '');
      const error = validateField(field, value);

      if (error) {
        hasErrors = true;
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData as unknown as T);
    }
  };

  const renderField = (field: SchemaField) => {
    const value = String(formData[field.name] || '');
    const error = isSubmitted ? errors[field.name] || '' : '';

    switch (field.type) {
      case 'select':
        const selectField = field as SelectField;
        return (
          <Select
            key={field.name}
            label={field.label}
            value={value}
            size={size}
            options={selectField.options.map((opt) => ({
              ...opt,
              value: String(opt.value),
            }))}
            onChange={(val: string) => handleChange(field, val)}
            error={error}
            required={field.required}
            variant={selectVariant}
            placeholder={field.placeholder}
          />
        );
      case 'checkbox':
        return (
          <div key={field.name} className="checkbox-field">
            <Input
              type="checkbox"
              label={field.label}
              checked={Boolean(formData[field.name])}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(field, String(e.target.checked))
              }
              errorMessage={error}
              required={field.required}
            />
          </div>
        );
      case 'textarea':
        return (
          <Input
            key={field.name}
            label={field.label}
            value={value}
            size={size}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => handleChange(field, e.target.value)}
            errorMessage={error}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            label={field.label}
            value={value}
            size={size}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(field, e.target.value)
            }
            isInvalid={!!error}
            errorMessage={error}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn(styles.form, className)}>
      {title && <h1>{title}</h1>}
      <div className={styles.fields}>
        {schema.map((field) => (
          <div key={field.name} className={styles.field}>
            {renderField(field)}
          </div>
        ))}
      </div>
      {content}
      <div className={styles.actions}>
        <Button
          fullWidth
          type="submit"
          isLoading={isLoading}
          variant={buttonVariant}
          size={size}
        >
          {submitLabel || 'Submit'}
        </Button>
      </div>
      {children}
    </form>
  );
}

CreateForm.displayName = 'CreateForm';

export default CreateForm;
