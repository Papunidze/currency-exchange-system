'use client';
import React, { useId, forwardRef, useState } from 'react';
import styles from './input.module.scss';
import { InputProps } from './input.interfaces';
import { cn } from '@app-shared/lib/utils';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      startContent,
      endContent,
      helperText,
      errorMessage,
      isInvalid = false,
      isValid = false,
      fullWidth = true,
      size = 'medium',
      placeholder,
      className = '',
      required,
      disabled,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));

    const statusClass = isInvalid ? styles.error : isValid ? styles.valid : '';
    const labelStatusClass = isInvalid
      ? styles.errorLabel
      : isValid
        ? styles.validLabel
        : '';

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value));
      props.onChange?.(e);
    };

    return (
      <div
        className={cn(
          styles.inputContainer,
          fullWidth ? styles.fullWidth : '',
          disabled ? styles.disabled : '',
        )}
      >
        <div
          className={cn(
            styles.inputWrapper,
            styles[size],
            statusClass,
            className,
            isFocused ? styles.focused : '',
            hasValue ? styles.hasValue : '',
          )}
        >
          {startContent && (
            <div className={styles.inputStart}>{startContent}</div>
          )}

          <div className={styles.inputField}>
            <input
              ref={ref}
              id={uniqueId}
              className={styles.input}
              placeholder={placeholder || ' '}
              disabled={disabled}
              required={required}
              aria-invalid={isInvalid}
              aria-describedby={
                helperText || errorMessage ? `${uniqueId}-helper` : undefined
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              defaultValue={defaultValue}
              {...props}
            />
            {label && (
              <label
                htmlFor={uniqueId}
                className={`${styles.inputLabel} ${labelStatusClass}`}
              >
                {label}
                {required && (
                  <span className={styles.requiredIndicator}>*</span>
                )}
              </label>
            )}
          </div>

          {endContent && <div className={styles.inputEnd}>{endContent}</div>}
        </div>

        {(helperText || errorMessage) && (
          <div
            id={`${uniqueId}-helper`}
            className={`
              ${styles.helperText}
              ${isInvalid ? styles.errorText : ''}
            `}
          >
            {isInvalid ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
