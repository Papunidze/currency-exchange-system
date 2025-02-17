import Input from "ui/input";
import styles from "./form.module.scss";

interface InputProps {
  label: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormControl = ({ label, name, type, onChange, error }: InputProps) => (
  <div className={styles.form__control}>
    <Input
      label={label}
      id={name}
      name={name}
      type={type}
      onChange={onChange}
    />
    <p
      className={`${styles.form__error__message} ${
        error ? styles["form__error__message--visible"] : ""
      }`}
    >
      {error}
    </p>
  </div>
);

export default FormControl;
