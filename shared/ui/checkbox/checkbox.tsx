import { FC } from 'react';
import { CheckboxProps } from './checkbox.interfaces';
import { cn } from '@app-shared/lib/utils';
import styles from './checkbox.module.scss';

export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  size = 'md',
  variant = 'primary',
  error,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <label
        className={cn(
          styles.checkbox,
          styles[size],
          styles[variant],
          disabled && styles.disabled,
          error && styles.error,
          className,
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={styles.checkboxInput}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {label && (
          <span
            className={styles.checkboxLabel}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        )}
      </label>
      {error && (
        <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};
