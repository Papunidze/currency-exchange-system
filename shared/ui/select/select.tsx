'use client';
import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './select.module.scss';
import IconButton from '../iconButton';

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
    <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>▼</span>
  );

  return (
    <div
      className={`
        ${styles.selectContainer}
        ${fullWidth ? styles.fullWidth : ''}
        ${disabled ? styles.disabled : ''}
        ${className}
      `}
      ref={selectRef}
    >
      <div
        className={`
          ${styles.select}
          ${styles[variant]}
          ${styles[size]}
          ${isOpen ? styles.open : ''}
          ${error ? styles.error : ''}
          ${isFocused || hasValue ? styles.focused : ''}
          ${!selectedValue ? 'placeholder-shown' : ''}
        `}
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
            className={`${styles.label} ${error ? styles.errorLabel : ''}`}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <IconButton
          icon={chevronIcon}
          variant={variant === 'ghost' ? 'ghost' : 'ghost'}
          size="small"
          className={styles.chevronButton}
          aria-hidden="true"
        />
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
              className={`
                ${styles.option}
                ${option.value === selectedValue ? styles.selected : ''}
                ${option.disabled ? styles.disabled : ''}
              `}
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
        <div className={`${styles.helper} ${error ? styles.error : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Select;
