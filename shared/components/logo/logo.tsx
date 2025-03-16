import React from 'react';
import Image from '@app-shared/components/Image';
import styles from './logo.module.scss';
import { cn } from '@app-shared/lib/utils';
import { LogoProps } from './logo.interfaces';

const Logo = ({
  size = 'md',
  variant = 'primary',
  layout = 'horizontal',
  text = 'CurrencyX',
  showText = true,
  direction = 'row',
  className,
}: LogoProps) => {
  return (
    <div
      className={cn(
        styles.logoContainer,
        styles[size],
        layout === 'vertical' && styles.vertical,
        styles[variant],
        className,
        styles[direction],
      )}
    >
      <div className={styles.logo}>
        <Image
          imageKey="logo:primary"
          alt="Currency Exchange System"
          className={styles.logoIcon}
        />
      </div>

      {showText && <span className={styles.logoText}>{text}</span>}
    </div>
  );
};

export default Logo;
