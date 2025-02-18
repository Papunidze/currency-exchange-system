import { ButtonProps } from "@app-shared/interfaces";
import styles from "./button.module.scss";
import ProgressActivityIcon from "@app-shared/icons";

const Button = ({
  children,
  variant = "btn-primary",
  ...props
}: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} {...props}>
      {variant === "btn-loading" && <ProgressActivityIcon />}
      <span className="button-span">{children}</span>
    </button>
  );
};

export default Button;
