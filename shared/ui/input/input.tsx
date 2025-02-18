import React, { useId } from "react";
import styles from "./input.module.scss";
import { InputProps } from "@app-shared/interfaces";

const Input = ({
  label = "Enter Text...",
  startContent,
  endContent,
  ...props
}: InputProps) => {
  const uniqueId = useId();

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
