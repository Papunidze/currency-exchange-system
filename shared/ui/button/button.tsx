import ProgressActivityIcon from "shared/icons";
import styles from "./button.module.scss";
import { ButtonProps } from "@app-shared/interfaces";

const Button = ({
  children,
  variant = "btn-primary",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {variant === "btn-loading" && <ProgressActivityIcon />}
      <span className="button-span">{children}</span>
    </button>
  );
};

export default Button;
