'use client';
import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './select.module.scss';
import IconButton from '../iconButton';
import { cn } from '@app-shared/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost';

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  variant?: SelectVariant;
}

const Select = ({
  options,
  value,
  defaultValue,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
  size = 'medium',
  fullWidth = true,
  variant = 'primary',
}: SelectProps) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || '',
  );
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const hasValue = Boolean(selectedValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
  };

  const chevronIcon = (
    <span className={cn(styles.chevron, { [styles.open]: isOpen })}>▼</span>
  );

  return (
    <div
      className={cn(
        styles.selectContainer,
        {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
        },
        className,
      )}
      ref={selectRef}
    >
      <div
        className={cn(styles.select, styles[variant], styles[size], {
          [styles.open]: isOpen,
          [styles.error]: !!error,
          [styles.focused]: isFocused || hasValue,
          'placeholder-shown': !selectedValue,
        })}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label`}
      >
        <div className={styles.value}>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        {label && (
          <label
            id={`${id}-label`}
            className={cn(styles.label, { [styles.errorLabel]: !!error })}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <IconButton
          icon={chevronIcon}
          variant="ghost"
          size="small"
          className={styles.chevronButton}
          aria-hidden="true"
        />
        <fieldset
          aria-hidden="true"
          className={styles.selectFieldset}
          tabIndex={-1}
        >
          <legend className={styles.selectLegend}>
            <span>{label}</span>
          </legend>
        </fieldset>
      </div>

      {isOpen && (
        <ul
          className={styles.dropdown}
          role="listbox"
          id={`${id}-listbox`}
          aria-label={label || 'Select options'}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(styles.option, {
                [styles.selected]: option.value === selectedValue,
                [styles.disabled]: option.disabled,
              })}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => handleSelect(option)}
            >
              {option.label}
              {option.value === selectedValue && (
                <span className={styles.checkmark}>✓</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {(error || helperText) && (
        <div className={cn(styles.helper, { [styles.error]: !!error })}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
