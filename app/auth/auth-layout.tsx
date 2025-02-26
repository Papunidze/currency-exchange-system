import { ReactNode } from 'react';
import styles from './auth.module.scss';

export default function AuthLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className={styles.form__wrapper}>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}
