import styles from "./button.module.scss";

type ButtonVariant =
  | "btn-primary"
  | "btn-secondary"
  | "btn-outlined"
  | "btn-loading"
  | "btn-danger"
  | "btn-warning"
  | "btn-success";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
const Button = ({
  children,
  variant = "btn-primary",
  ...props
}: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} {...props}>
      <span className="button-span">{children}</span>
    </button>
  );
};

export default Button;
