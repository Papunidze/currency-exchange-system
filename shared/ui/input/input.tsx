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
        className={cn(styles.inputContainer, {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
        })}
      >
        <div
          className={cn(
            styles.inputWrapper,
            styles[size],
            {
              [styles.error]: isInvalid,
              [styles.valid]: isValid,
              [styles.focused]: isFocused,
              [styles.hasValue]: hasValue,
              [styles.bothContent]: startContent && endContent,
            },
            className,
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
                className={cn(styles.inputLabel, {
                  [styles.errorLabel]: isInvalid,
                  [styles.validLabel]: isValid,
                })}
              >
                {label}
                {required && (
                  <span className={styles.requiredIndicator}>*</span>
                )}
              </label>
            )}
          </div>

          {endContent && <div className={styles.inputEnd}>{endContent}</div>}
          <fieldset
            aria-hidden="true"
            className={styles.inputFieldset}
            tabIndex={-1}
          >
            <legend className={styles.inputLegend}>
              <span>{label}</span>
            </legend>
          </fieldset>
        </div>

        {(helperText || errorMessage) && (
          <div
            id={`${uniqueId}-helper`}
            className={cn(styles.helperText, { [styles.errorText]: isInvalid })}
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
