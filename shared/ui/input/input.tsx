import React from "react";
import styles from "./input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = ({
  label = "Enter Text...",
  startContent,
  endContent,
  ...props
}: InputProps) => {
  const uniqueId = `${label}-${Date.now()}`;

  return (
    <div className={styles.inputWrapper}>
      {startContent && (
        <div className={styles.input__start}>{startContent}</div>
      )}
      <input className={styles.input__field} {...props} id={uniqueId} />
      <label className={styles.input__label} htmlFor={uniqueId}>
        {label}
      </label>
      {endContent && <div className={styles.input__end}>{endContent}</div>}
    </div>
  );
};

export default Input;
