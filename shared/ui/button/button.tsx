import { ProgressActivityIcon } from 'shared/icons';
import styles from './button.module.scss';
import { ButtonProps } from '@app-shared/interfaces';

const Button = ({
  children,
  variant = 'btn-primary',
  className = '',
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className}`}
      type={props.type || 'button'}
      {...props}
    >
      {icon && <span className={styles['btn-icon']}>{icon}</span>}
      {variant === 'btn-loading' && <ProgressActivityIcon />}
      <span className={styles.button__span}>{children}</span>
    </button>
  );
};

export default Button;
