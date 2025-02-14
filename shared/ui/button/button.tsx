import styles from "./button.module.scss";

type ButtonVariant =
  | "btn-primary"
  | "btn-secondary"
  | "btn-outlined"
  | "btn-loading"
  | "btn-danger"
  | "btn-warning"
  | "btn-success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}
const Button = ({ children, variant = "btn-primary" }: ButtonProps) => {
  return (
    <button className={styles[variant]}>
      <span className="button-span">{children}</span>
    </button>
  );
};

export default Button;
