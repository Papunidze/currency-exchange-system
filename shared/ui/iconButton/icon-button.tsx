import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './icon-button.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const IconButton = ({
  icon,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`${styles.iconButton} ${styles[variant]} ${styles[size]} ${className || ''}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
