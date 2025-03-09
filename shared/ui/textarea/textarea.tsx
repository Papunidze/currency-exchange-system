import { forwardRef, useId, useState } from 'react';
import { cn } from '@app-shared/lib/utils';
import styles from './textarea.module.scss';
import { TextareaProps } from './textarea.interfaces';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isInvalid = false,
      isValid = false,
      fullWidth = true,
      showCount = false,
      maxLength,
      autoResize = false,
      size = 'medium',
      className = '',
      contentClassName = '',
      required,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>(
      (value as string) || defaultValue?.toString() || '',
    );

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);

      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }

      onChange?.(e);
    };

    const statusClass = isInvalid ? styles.error : isValid ? styles.valid : '';

    const labelStatusClass = isInvalid
      ? styles.errorLabel
      : isValid
        ? styles.validLabel
        : '';

    const hasValue = currentValue.length > 0;
    const charCount = currentValue.length;

    return (
      <div
        className={cn(
          styles.textareaContainer,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          className,
        )}
      >
        <div
          className={cn(
            styles.textareaWrapper,
            styles[size],
            statusClass,
            isFocused && styles.focused,
            hasValue && styles.hasValue,
            contentClassName,
          )}
        >
          <div className={styles.textareaField}>
            <textarea
              ref={ref}
              id={uniqueId}
              className={styles.textarea}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              required={required}
              maxLength={maxLength}
              aria-invalid={isInvalid}
              aria-describedby={
                helperText || errorMessage ? `${uniqueId}-helper` : undefined
              }
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            {label && (
              <label
                htmlFor={uniqueId}
                className={cn(styles.textareaLabel, labelStatusClass)}
              >
                {label}
                {required && (
                  <span className={styles.requiredIndicator}>*</span>
                )}
              </label>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          {(helperText || errorMessage) && (
            <div
              id={`${uniqueId}-helper`}
              className={cn(styles.helperText, isInvalid && styles.errorText)}
            >
              {isInvalid ? errorMessage : helperText}
            </div>
          )}

          {showCount && (
            <div className={styles.charCount}>
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
