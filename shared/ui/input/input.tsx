import React from "react";
import styles from "./input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label = "Enter Text...", ...props }: InputProps) => {
  return (
    <label className={styles.input}>
      <input className={styles.input__field} {...props} />
      <span className={styles.input__label}>{label}</span>
    </label>
  );
};

export default Input;
