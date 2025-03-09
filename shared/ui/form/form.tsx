'use client';

import React from 'react';
import Button from '@app-shared/ui/button';
import Input from '@app-shared/ui/input';
import Select from '@app-shared/ui/select';
import styles from './form.module.scss';
import { FormProps } from './form.inerfaces';
import { SchemaField, SelectField } from '@app-shared/services/schema';

function CreateForm<T extends Record<string, any>>({
  schema,
  onSubmit,
  defaultValues,
  isLoading = false,
  submitLabel = 'Submit',
  selectVariant = 'primary',
  buttonVariant = 'primary',
  size = 'small',
  title = 'Form',
  content,
}: FormProps<T>) {
  const [formData, setFormData] = React.useState<Partial<T>>(
    defaultValues || {},
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateField = (field: SchemaField, value: string) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.validators) {
      return (field.validators as (val: string) => string | undefined)(value);
    }
    return undefined;
  };

  const handleChange = (field: SchemaField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));

    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field.name]: error || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    schema.forEach((field) => {
      const value = String(formData[field.name as keyof T] || '');
      const error = validateField(field, value);

      if (error) {
        hasErrors = true;
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData as T);
    }
  };

  const renderField = (field: SchemaField) => {
    const value = String(formData[field.name as keyof T] || '');
    const error = errors[field.name];

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
            error={errors[field.name]}
            required={field.required}
            variant={selectVariant}
            placeholder={field.placeholder}
          />
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
            errorMessage={errors[field.name]}
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
            errorMessage={errors[field.name]}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>{title}</h1>
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
          type="submit"
          isLoading={isLoading}
          variant={buttonVariant}
          size={size}
        >
          {submitLabel || 'Submit'}
        </Button>
      </div>
    </form>
  );
}

CreateForm.displayName = 'Form';

export default CreateForm;
